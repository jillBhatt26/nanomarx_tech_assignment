import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            <h1 className="text mb-5">Login</h1>

            <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                Error message
            </p>

            <form className="space-y-5">
                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="emailOrUsername">E-mail or Username:</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                    />
                </div>

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                    />
                </div>

                <button
                    type="submit"
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
