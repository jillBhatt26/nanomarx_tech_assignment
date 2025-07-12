import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { AuthServices } from '../services/auth';
import { setUser } from '../store/slices/auth';

YupPassword(yup);

const Signup = () => {
    // states
    const [inputEmail, setInputEmail] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const [signupError, setSignupError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);

    // schema
    const signupInputsSchema = useMemo(
        () =>
            yup
                .object({
                    username: yup
                        .string('Username must be a string')
                        .trim()
                        .required('Username is required')
                        .min(
                            4,
                            'Username should be more than 4 characters long'
                        )
                        .max(
                            255,
                            'Username should be less than 255 characters long'
                        )
                        .matches(
                            /^[^\s<>&'"\\]+$/,
                            'Cannot contain spaces or special characters'
                        ),
                    email: yup
                        .string('Email should be a string')
                        .trim()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: yup
                        .string('Password must be a string')
                        .trim()
                        .required('Password is required')
                        .password()
                        .min(8, 'Password should be more than 8 characters')
                        .max(
                            255,
                            'Password should be less than 255 characters'
                        ),
                    confirmPassword: yup
                        .string('Confirm password must be a string')
                        .trim()
                        .required('Please retype password to confirm password')
                        .password()
                        .oneOf(
                            [yup.ref('password')],
                            'Confirm password should be same as password'
                        )
                        .min(
                            8,
                            'Confirm Password should be more than 8 characters'
                        )
                        .max(
                            255,
                            'Confirm Password should be less than 255 characters'
                        )
                })
                .required('All inputs are required'),
        []
    );

    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // effects
    useEffect(() => {
        setDisableButton(loading);
    }, [loading, signupError]);

    // event handlers
    const handleUserSignup = async e => {
        e.preventDefault();

        if (
            !inputUsername ||
            !inputEmail ||
            !inputPassword ||
            !inputConfirmPassword
        )
            return setSignupError('All fields required!');

        try {
            const signupInputs = await signupInputsSchema.validate({
                username: inputUsername,
                email: inputEmail,
                password: inputPassword,
                confirmPassword: inputConfirmPassword
            });

            const signupResData = await AuthServices.signup(signupInputs);

            const { success, data, error } = signupResData;

            if (success && data && data.user) {
                dispatch(setUser(data.user));
                return navigate('/', { replace: true });
            }

            setSignupError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setSignupError(error.message);
            } else setSignupError(error.error ?? 'Failed to signup new user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            <h1 className="text mb-5">Sign up</h1>

            {signupError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {signupError}
                </p>
            )}

            <form
                className="space-y-5"
                onSubmit={handleUserSignup}
                autoComplete="off"
                noValidate
            >
                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputUsername}
                        onChange={e => setInputUsername(e.target.value)}
                    />
                </div>

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputEmail}
                        onChange={e => setInputEmail(e.target.value)}
                    />
                </div>

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputPassword}
                        onChange={e => setInputPassword(e.target.value)}
                    />
                </div>

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputConfirmPassword}
                        onChange={e => setInputConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={disableButton}
                    className="text-sm bg-[#181818] text-white outline-1 outline-[#333] px-3 py-0.5 hover:cursor-pointer hover:bg-[#202020]"
                >
                    Login
                </button>
            </form>

            <p className="text-sm my-5">
                Already a user?{' '}
                <Link to="/login" className="underline text-[#8AB1FF]">
                    Login.
                </Link>
            </p>
        </div>
    );
};

export default Signup;
