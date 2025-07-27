import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthServices } from '../services/auth';
import { setUser } from '../store/slices/auth';

const Navbar = () => {
    // hooks
    const location = useLocation();
    const authUser = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // event handlers
    const handleLogout = async () => {
        await AuthServices.logout();

        dispatch(setUser(null));

        navigate('/login', { replace: true });
    };

    return (
        <div className="pt-3 pb-3 mb-3 flex  md:justify-between space-x-2 lg:space-x-5 px-2 lg:px-0 bg-[#202020] sm:bg-black ">
            {/* Logo */}
            <Link to="/">
                <h1 className="uppercase font-serif text-md text-white bg-[#500000] inline-block px-2">
                    L
                </h1>
            </Link>

            {/* Nav items */}
            <ul className="flex space-x-4  md:space-x-2 text-[14px] font-semibold text-[#FFFFFFB0] sm:flex-1 mt-0.5 flex-nowrap overflow-x-auto px-2">
                <Link
                    to="/active"
                    className={`pb-1 ${
                        location.pathname === '/active'
                            ? 'md:border-b-3 md:border-orange-700'
                            : 'md:border-b-3 md:border-transparent'
                    } min-w-12`}
                >
                    <li>Active</li>
                </Link>

                <Link
                    to="/recent"
                    className={`pb-1 ${
                        location.pathname === '/recent'
                            ? 'md:border-b-3 md:border-orange-700'
                            : 'md:border-b-3 md:border-transparent'
                    } min-w-12`}
                >
                    <li>Recent</li>
                </Link>

                <Link
                    to="/comments"
                    className={`pb-1 ${
                        location.pathname === '/comments'
                            ? 'md:border-b-3 md:border-orange-700'
                            : 'md:border-b-3 md:border-transparent'
                    } min-w-12 mr-10 md:mr-4`}
                >
                    <li>Comments</li>
                </Link>

                <Link
                    to="/search"
                    className={`pb-1 ${
                        location.pathname === '/search'
                            ? 'md:border-b-3 md:border-orange-700'
                            : 'md:border-b-3 md:border-transparent'
                    } min-w-12`}
                >
                    <li>Search</li>
                </Link>

                <Link
                    to="/you"
                    className={`pb-1 ${
                        location.pathname === '/you'
                            ? 'md:border-b-3 md:border-orange-700'
                            : 'md:border-b-3 md:border-transparent'
                    } min-w-12`}
                >
                    <li>For you</li>
                </Link>
            </ul>

            {/* Login */}
            <div className="flex-1 flex justify-end">
                {authUser ? (
                    <button
                        type="button"
                        className="space-x-4 text-[14px] font-semibold text-[#FFFFFFB0] hover:cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className={`space-x-4 mt-0.5 md:mt-0 text-[14px] font-semibold text-[#FFFFFFB0] ${
                            location.pathname === '/login'
                                ? 'md:border-b-3 md:border-orange-700'
                                : 'md:border-b-3 md:border-transparent'
                        }`}
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
