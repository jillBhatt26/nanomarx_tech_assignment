const { Router } = require('express');
const { StoryControllers } = require('./story.controller');

const storyRouter = Router();

storyRouter.get('/', StoryControllers.fetchStories);

storyRouter.post('/', StoryControllers.create);

storyRouter.get('/search', StoryControllers.searchStories);

module.exports = storyRouter;
