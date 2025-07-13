import { request } from '../config/axios';

class VoteServices {
    static VOTE_URL = '/vote';

    static addVote = async storyID => {
        try {
            const response = await request({
                url: `${this.VOTE_URL}/${storyID}`,
                method: 'POST'
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static removeVote = async storyID => {
        try {
            const response = await request({
                url: `${this.VOTE_URL}/${storyID}`,
                method: 'DELETE'
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };
}

export { VoteServices };
