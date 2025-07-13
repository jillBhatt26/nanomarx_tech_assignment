const { APIError } = require('../../common/APIError');
const VoteModel = require('./vote.model');

class VoteControllers {
    static addVote = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            const hasAlreadyVoted = await VoteModel.findOne({
                userID: req.session.userID,
                storyID: req.params.storyID
            });

            if (hasAlreadyVoted)
                throw new APIError(400, 'Already voted for the story.');

            const vote = await VoteModel.create({
                userID: req.session.userID,
                storyID: req.params.storyID
            });

            return res.status(200).json({
                success: true,
                data: {
                    vote
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            if (error instanceof ValidationError)
                return next(new APIError(400, error.message));

            return next(new APIError(500, 'Error occurred while adding vote.'));
        }
    };

    static removeVote = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            await VoteModel.findOneAndDelete({
                userID: req.session.userID,
                storyID: req.params.storyID
            });

            return res.status(200).json({
                success: true
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            if (error instanceof ValidationError)
                return next(new APIError(400, error.message));

            return next(
                new APIError(500, 'Error occurred while removing vote.')
            );
        }
    };
}

module.exports = { VoteControllers };
