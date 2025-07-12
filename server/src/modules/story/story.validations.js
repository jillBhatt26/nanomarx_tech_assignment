const yup = require('yup');

const createStoryInputSchema = yup.object({
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
});

module.exports = { createStoryInputSchema };
