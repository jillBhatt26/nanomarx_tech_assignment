const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
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

            const comment = await CommentModel.create({
                text: createCommentBody.text,
                userID: req.session.userID
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

            return res.status(200).json({
                success: true,
                data: {
                    comments
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

            return res.status(200).json({
                success: true,
                data: {
                    comments
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
