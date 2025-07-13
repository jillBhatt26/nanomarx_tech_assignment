const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
const { StoryServices } = require('./story.services');
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

    static fetchStories = async (req, res, next) => {
        try {
            const stories = await StoryServices.queryStories();

            const storiesFullInfo = await StoryServices.fetchStoriesFullInfo(
                stories
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
                stories
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
}

module.exports = { StoryControllers };
