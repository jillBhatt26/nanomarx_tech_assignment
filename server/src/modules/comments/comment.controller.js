const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
const AuthModel = require('../auth/auth.model');
const StoryModel = require('../story/story.model');
const CommentModel = require('./comment.model');
const {
    createCommentInputsSchema,
    commentSearchQuery
} = require('./comment.validations');

class CommentControllers {
    static create = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            const createCommentBody = await createCommentInputsSchema.validate(
                req.body
            );

            const { text, storyID } = createCommentBody;

            const comment = await CommentModel.create({
                text,
                userID: req.session.userID,
                storyID
            });

            return res.status(200).json({
                success: true,
                data: {
                    comment
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

    static fetchComments = async (req, res, next) => {
        try {
            const comments = await CommentModel.find({}).sort({
                createdAt: -1
            });

            const commentsDetails = await Promise.all(
                comments.map(async comment => {
                    const [auth, story] = await Promise.all([
                        AuthModel.findById(comment.userID).select('username'),
                        StoryModel.findById(comment.storyID).select('title')
                    ]);

                    return {
                        ...comment.toObject(),
                        username: auth.username,
                        storyTitle: story.title
                    };
                })
            );

            return res.status(200).json({
                success: true,
                data: {
                    comments: commentsDetails
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching stories.')
            );
        }
    };

    static fetchStoryComments = async (req, res, next) => {
        try {
            const comments = await CommentModel.find({
                storyID: req.params.storyID
            }).sort({
                createdAt: -1
            });

            const commentsWithUsername = await Promise.all(
                comments.map(async comment => {
                    const auth = await AuthModel.findById(
                        comment.userID
                    ).select('username');

                    return {
                        ...comment.toObject(),
                        username: auth.username
                    };
                })
            );

            return res.status(200).json({
                success: true,
                data: {
                    comments: commentsWithUsername
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching stories.')
            );
        }
    };

    static searchComments = async (req, res, next) => {
        try {
            if (!req.query.q)
                throw new APIError(400, 'Query required to search stories!');

            const validatedQuery = await commentSearchQuery.validate(req.query);

            const comments = await CommentModel.find({
                text: { $regex: validatedQuery.q, $options: 'i' }
            }).sort({
                createdAt: -1
            });

            const commentsDetails = await Promise.all(
                comments.map(async comment => {
                    const [auth, story] = await Promise.all([
                        AuthModel.findById(comment.userID).select('username'),
                        StoryModel.findById(comment.storyID).select('title')
                    ]);

                    return {
                        ...comment.toObject(),
                        username: auth.username,
                        storyTitle: story.title
                    };
                })
            );

            return res.status(200).json({
                success: true,
                data: {
                    comments: commentsDetails
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while searching comments.')
            );
        }
    };
}

module.exports = { CommentControllers };
