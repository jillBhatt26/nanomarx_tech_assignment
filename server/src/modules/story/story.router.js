const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const { StoryControllers } = require('./story.controller');

const storyRouter = Router();

storyRouter.get('/', StoryControllers.fetchStories);

storyRouter.post('/', authMiddleware, StoryControllers.create);

storyRouter.get('/active', StoryControllers.fetchStoriesActive);

storyRouter.get('/search', StoryControllers.searchStories);

storyRouter.get('/you', authMiddleware, StoryControllers.fetchForYouStories);

storyRouter.get('/:id', StoryControllers.fetchStoryID);

module.exports = storyRouter;
