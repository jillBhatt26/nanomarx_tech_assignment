const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const { VoteControllers } = require('./vote.controller');

const voteRouter = Router();

voteRouter.post('/:storyID', authMiddleware, VoteControllers.addVote);

voteRouter.delete('/:storyID', authMiddleware, VoteControllers.removeVote);

module.exports = voteRouter;
