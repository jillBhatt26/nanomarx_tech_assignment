const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
// const { StoryControllers } = require('./story.controller');

const storyRouter = Router();

storyRouter.get('/', StoryControllers.fetchStories);

storyRouter.post('/', authMiddleware, StoryControllers.create);

storyRouter.get('/search', StoryControllers.searchStories);

// module.exports = storyRouter;
