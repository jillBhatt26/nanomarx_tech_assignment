import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="pt-3 pb-3 flex justify-center md:justify-between space-x-2 lg:space-x-5 px-2 lg:px-0 bg-[#202020] sm:bg-black">
            {/* Logo */}
            <Link to="/">
                <h1 className="uppercase font-serif text-md text-white bg-[#500000] inline-block px-2">
                    L
                </h1>
            </Link>

            {/* Nav items */}
            <ul className="flex space-x-4  md:space-x-2 text-[14px] font-semibold text-[#FFFFFFB0] sm:flex-1 mt-0.5">
                <Link to="/active">
                    <li>Active</li>
                </Link>
                <Link to="/recent">
                    <li>Recent</li>
                </Link>
                <Link to="/comments">
                    <li>Comments</li>
                </Link>
                <Link to="/search">
                    <li>Search</li>
                </Link>
            </ul>

            {/* Login */}
            <Link
                to="/login"
                className="space-x-4 text-[14px] font-semibold text-[#FFFFFFB0]"
            >
                Login
            </Link>
        </div>
    );
};

export default Navbar;
