const { APIError } = require('../../common/APIError');
const StoryModel = require('./story.model');
const AuthModel = require('../auth/auth.model');
const CommentModel = require('../comments/comment.model');

class StoryServices {
    static queryStories = async (find = undefined, sort = undefined) => {
        try {
            const stories = await StoryModel.find(find ?? {}).sort(
                sort ?? {
                    createdAt: -1
                }
            );

            return stories;
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to query stories!'
            );
        }
    };

    static createStory = async createStoryData => {
        try {
            const story = await StoryModel.create(createStoryData);

            return story;
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to create new story!'
            );
        }
    };

    static getStoryUserInfo = async story => {
        try {
            const authUsername = await AuthModel.findById(story.userID).select(
                'username'
            );

            return {
                ...story.toObject(),
                username: authUsername.username
            };
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to fetch story user info!'
            );
        }
    };

    static fetchStoriesFullInfo = async stories => {
        try {
            const storiesFullInfo = await Promise.all(
                stories.map(async story => {
                    const [authUsername, count] = await Promise.all([
                        AuthModel.findById(story.userID).select('username'),
                        CommentModel.countDocuments({ storyID: story._id })
                    ]);

                    return {
                        ...story.toObject(),
                        username: authUsername.username,
                        totalComments: count
                    };
                })
            );

            return storiesFullInfo;
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to fetch stories!'
            );
        }
    };

    static fetchStoryDetailsByID = async storyID => {
        try {
            const story = await StoryModel.findById(storyID);

            const [authUsername, count] = await Promise.all([
                AuthModel.findById(story.userID).select('username'),
                CommentModel.countDocuments({ storyID })
            ]);

            return {
                ...story.toObject(),
                username: authUsername.username,
                totalComments: count
            };
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to fetch story details!'
            );
        }
    };

    static fetchStoriesActive = async () => {
        try {
            // get all stories which have at least 1 comment
            const activeStories = await StoryModel.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'storyID',
                        as: 'comments'
                    }
                },
                { $match: { comments: { $ne: [] } } },
                { $addFields: { commentCount: { $size: '$comments' } } },
                { $sort: { commentCount: -1 } }
            ]);

            // get full info of the stories
            const activeStoriesFullInfo = await Promise.all(
                activeStories.map(async story => {
                    const authDoc = await AuthModel.findById(
                        story.userID
                    ).select('username');

                    return {
                        ...story,
                        username: authDoc.username,
                        totalComments: story.comments.length
                    };
                })
            );

            return activeStoriesFullInfo;
        } catch (error) {
            if (error instanceof APIError) throw error;

            throw new APIError(
                500,
                error.message ?? 'Failed to fetch active stories!'
            );
        }
    };
}

module.exports = { StoryServices };
