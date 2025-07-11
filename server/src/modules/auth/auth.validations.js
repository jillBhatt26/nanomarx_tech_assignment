const yup = require('yup');
const YupPassword = require('yup-password');

YupPassword(yup);

const signupRequestBodySchema = yup.object({
    username: yup
        .string('Username must be a string')
        .trim()
        .required('Username is required')
        .min(4, 'Username must be minimum 4 characters')
        .max(255, 'Username must be maximum 255 characters long')
        .matches(
            /^[^\s<>&'"\\]+$/,
            'Cannot contain spaces or special characters'
        ),
    email: yup
        .string('Email must be a string')
        .trim()
        .required('Email is required')
        .email('Email format invalid')
        .matches(
            /^[^\s<>&'"\\]+$/,
            'Cannot contain spaces or special characters'
        ),
    password: yup
        .string('Password must be a string')
        .trim()
        .required('Password is required')
        .password()
});

const loginRequestBodySchema = yup.object({
    usernameOrEmail: yup
        .string('Username or email must be a string')
        .trim()
        .required('Either username or email is required')
        .min(4, 'Username or email must be more than 4 characters long')
        .max(255, 'Username or email must be less than 255 characters long'),
    password: yup
        .string('Password must be a string')
        .trim()
        .required('Password is required')
        .password()
});

module.exports = {
    signupRequestBodySchema,
    loginRequestBodySchema
};
