const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const { CommentControllers } = require('./comment.controller');

const commentRouter = Router();

commentRouter.get('/', CommentControllers.fetchComments);

commentRouter.post('/', authMiddleware, CommentControllers.create);

commentRouter.get('/search', CommentControllers.searchComments);

commentRouter.get('/story/:storyID', CommentControllers.fetchStoryComments);

module.exports = commentRouter;
