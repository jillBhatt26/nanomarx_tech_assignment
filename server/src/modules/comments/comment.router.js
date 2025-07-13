const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const { CommentControllers } = require('./comment.controller');

const commentRouter = Router();

commentRouter.get('/', CommentControllers.fetchComments);

commentRouter.post('/', authMiddleware, CommentControllers.create);

commentRouter.get('/search', CommentControllers.searchComments);

module.exports = commentRouter;
