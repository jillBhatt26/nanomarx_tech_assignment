const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
const { StoryServices } = require('./story.services');
const UpvoteModel = require('../vote/vote.model');
const StoryModel = require('./story.model');

const { createStoryInputSchema } = require('./story.validations');

class StoryControllers {
    static create = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            const createStoryBody = await createStoryInputSchema.validate(
                req.body
            );

            const { title, url, tags } = createStoryBody;

            const domainFromURL = new URL(url);

            const story = await StoryServices.createStory({
                title,
                url,
                domain: `${domainFromURL.protocol}//${domainFromURL.hostname}`,
                tags: tags ?? [],
                userID: req.session.userID
            });

            return res.status(200).json({
                success: true,
                data: {
                    story
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            if (error instanceof ValidationError)
                return next(new APIError(400, error.message));

            return next(
                new APIError(500, 'Error occurred while creating new story.')
            );
        }
    };

    static fetchStoryID = async (req, res, next) => {
        try {
            const story = await StoryServices.fetchStoryDetailsByID(
                req.params.id,
                req.session.userID ?? undefined
            );

            return res.status(200).json({
                success: true,
                data: {
                    story
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching story.')
            );
        }
    };

    static fetchStories = async (req, res, next) => {
        try {
            const stories = await StoryServices.queryStories();

            const storiesFullInfo = await StoryServices.fetchStoriesFullInfo(
                stories,
                req.session.userID ?? undefined
            );

            return res.status(200).json({
                success: true,
                data: {
                    stories: storiesFullInfo
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching stories.')
            );
        }
    };

    static fetchStoriesActive = async (req, res, next) => {
        try {
            const activeStories = await StoryServices.fetchStoriesActive(
                req.session.userID ?? undefined
            );

            return res.status(200).json({
                success: true,
                data: {
                    stories: activeStories
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching stories.')
            );
        }
    };

    static searchStories = async (req, res, next) => {
        try {
            if (!req.query.q)
                throw new APIError(400, 'Query required to search stories!');

            const stories = await StoryServices.queryStories({
                $or: [
                    {
                        title: { $regex: req.query.q, $options: 'i' }
                    },
                    {
                        url: { $regex: req.query.q, $options: 'i' }
                    },
                    {
                        domain: { $regex: req.query.q, $options: 'i' }
                    }
                ]
            });

            const storiesFullInfo = await StoryServices.fetchStoriesFullInfo(
                stories,
                req.session.userID
            );

            return res.status(200).json({
                success: true,
                data: {
                    stories: storiesFullInfo
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while searching stories.')
            );
        }
    };

    /**
     * TODOs:
     * -> Check auth user (done)
     * -> Fetch stories upvoted by the user (done)
     * -> Collect all the tags of the stories (done)
     * -> Query stories by the tags and not the same stories (done)
     * -> Return stories in response (done)
     */

    static fetchForYouStories = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            // get user votes
            const userUpvotedStories = await UpvoteModel.find({
                userID: req.session.userID
            });

            // get tags of upvoted stories
            let storiesTags = await Promise.all(
                userUpvotedStories.map(async s => {
                    const { tags } = await StoryModel.findOne({
                        _id: s.storyID,
                        userID: req.session.userID
                    }).select('tags');

                    // no clue what was the issue earlier
                    return tags;
                })
            );

            // flattening out the tags and removing duplicate tags using Set data structure
            storiesTags = Array.from(
                new Set(storiesTags.reduce((acc, cur) => acc.concat(cur), []))
            );

            // getting storyIDs of upvoted stories
            const upvotedStoryIDs = userUpvotedStories.map(s => s.storyID);

            // getting all the stories with upvoted tags and removing the upvoted stories
            const stories = await StoryModel.find({
                tags: {
                    $in: storiesTags // story should have at least one tag from the array
                },
                _id: {
                    $nin: upvotedStoryIDs // story shouldn't have been upvoted by the user
                },
                userID: {
                    $ne: req.session.userID // (had not been actively discussed but) don't recommend the user's own stories
                }
            });

            const storiesWithFullInfo =
                await StoryServices.fetchStoriesFullInfo(stories);

            return res.status(200).json({
                success: true,
                data: {
                    stories: storiesWithFullInfo
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(
                    500,
                    error.message ??
                        'Error occurred while fetching "for you" stories.'
                )
            );
        }
    };
}

module.exports = { StoryControllers };
