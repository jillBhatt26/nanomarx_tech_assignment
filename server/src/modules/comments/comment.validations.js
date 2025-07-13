const yup = require('yup');

const createCommentInputsSchema = yup
    .object({
        text: yup
            .string('Text must be a string')
            .trim()
            .required('Text is required')
            .min(4, 'Text must be minimum 4 characters')
            .max(255, 'Text must be maximum 255 characters long')
    })
    .stripUnknown();

const commentSearchQuery = yup
    .object({
        q: yup
            .string('Query should be string')
            .trim()
            .required('Query is required')
            .max(255, 'Query should not be more than 255 characters long')
    })
    .stripUnknown();

module.exports = { createCommentInputsSchema, commentSearchQuery };
