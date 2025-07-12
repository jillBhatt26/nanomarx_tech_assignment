import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            <h1 className="text mb-5">Sign up</h1>

            <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                Error message
            </p>

            <form className="space-y-5">
                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                    />
                </div>

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
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

                <div className="flex justify-between space-x-5 md:space-x-20">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
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
                Already a user?{' '}
                <Link to="/login" className="underline text-[#8AB1FF]">
                    Login.
                </Link>
            </p>
        </div>
    );
};

export default Signup;
