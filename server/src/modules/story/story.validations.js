const yup = require('yup');

const createStoryInputSchema = yup
    .object({
        title: yup
            .string('Title must be a string')
            .trim()
            .required('Title is required')
            .min(4, 'Title must be minimum 4 characters')
            .max(255, 'Title must be maximum 255 characters long'),
        url: yup
            .string('Title must be a string')
            .trim()
            .required('Title is required')
            .min(4, 'Title must be minimum 4 characters')
            .max(255, 'Title must be maximum 255 characters long'),
        tags: yup.array().of(yup.string())
    })
    .stripUnknown();

const storySearchQuery = yup
    .object({
        q: yup
            .string('Query should be string')
            .trim()
            .required('Query is required')
            .max(255, 'Query should not be more than 255 characters long')
    })
    .stripUnknown();

module.exports = { createStoryInputSchema, storySearchQuery };
