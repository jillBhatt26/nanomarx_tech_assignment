const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
const AuthModel = require('../auth/auth.model');
const StoryModel = require('./story.model');
import { createStoryInputSchema } from './story.validations';

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

            const story = await StoryModel.create({
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
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            const stories = await StoryModel.find({}).sort({
                createdAt: -1
            });

            return res.status(200).json({
                success: true,
                data: {
                    stories
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
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            if (!req.query.q)
                throw new APIError(400, 'Query required to search stories!');

            const stories = await StoryModel.find({
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

            return res.status(200).json({
                success: true,
                data: {
                    stories
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

export { StoryControllers };
