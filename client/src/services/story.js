import { request } from '../config/axios';

class StoryServices {
    static STORY_URL = '/story';

    static fetchStories = async () => {
        try {
            const response = await request({
                url: this.STORY_URL
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static searchStories = async q => {
        try {
            const response = await request({
                url: `${this.STORY_URL}/search?q=${q}`
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static create = async storyInputs => {
        try {
            const response = await request({
                url: `${this.STORY_URL}/signup`,
                method: 'POST',
                data: storyInputs
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };
}

export { StoryServices };
