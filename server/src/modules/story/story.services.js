const { APIError } = require('../../common/APIError');
const StoryModel = require('./story.model');
const AuthModel = require('../auth/auth.model');

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
                    return this.getStoryUserInfo(story);
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
}

module.exports = { StoryServices };
