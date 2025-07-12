import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { AuthServices } from '../services/auth';
import { setUser } from '../store/slices/auth';

YupPassword(yup);

const LoginPage = () => {
    const [inputEmailOrUsername, setInputEmailOrUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const loginInputsSchema = useMemo(
        () =>
            yup.object({
                emailOrUsername: yup
                    .string('Email or username should be string')
                    .trim()
                    .required('Either username or email is required')
                    .min(
                        4,
                        'Username or email should be at least 4 characters long'
                    )
                    .max(
                        255,
                        'Username or email should not be more than 255 characters long'
                    ),
                password: yup
                    .string('Password should be string')
                    .trim()
                    .required('Password is required')
                    .password()
            }),
        []
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // effects
    useEffect(() => {
        setDisableButton(loading);
    }, [loading, loginError]);

    // event handlers
    const handleLogin = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const loginInputs = await loginInputsSchema.validate({
                emailOrUsername: inputEmailOrUsername,
                password: inputPassword
            });

            const loginResData = await AuthServices.login(loginInputs);

            const { success, data, error } = loginResData;

            if (success && data && data.user) {
                dispatch(setUser(data.user));
                return navigate('/', { replace: true });
            }

            setLoginError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError)
                setLoginError(error.message);
            else setLoginError(error.error ?? 'Failed to login the user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            <h1 className="text mb-5">Login</h1>

            {loginError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {loginError}
                </p>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="emailOrUsername">E-mail or Username:</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputEmailOrUsername}
                        onChange={e => setInputEmailOrUsername(e.target.value)}
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

                <button
                    type="submit"
                    disabled={disableButton}
                    className="text-sm bg-[#181818] text-white outline-1 outline-[#333] px-3 py-0.5 hover:cursor-pointer hover:bg-[#202020]"
                >
                    Login
                </button>
            </form>

            <p className="text-sm my-5">
                Not a user yet?{' '}
                <Link to="/signup" className="underline text-[#8AB1FF]">
                    Sign up.
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
