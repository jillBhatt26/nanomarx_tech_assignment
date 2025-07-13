import { request } from '../config/axios';

class CommentServices {
    static COMMENT_URL = '/comment';

    static fetchComments = async () => {
        try {
            const response = await request({
                url: this.COMMENT_URL
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static fetchStoryComments = async storyID => {
        try {
            const response = await request({
                url: `${this.COMMENT_URL}/story/${storyID}`
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static searchComment = async q => {
        try {
            const response = await request({
                url: `${this.COMMENT_URL}/search?q=${q}`
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static create = async createCommentInputs => {
        try {
            const response = await request({
                url: this.COMMENT_URL,
                method: 'POST',
                data: createCommentInputs
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };
}

export { CommentServices };
