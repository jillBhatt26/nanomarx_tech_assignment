import { Outlet } from 'react-router-dom';
import Navbar from '../partials/Navbar';
import Footer from '../partials/Footer';

const AppLayout = () => {
    return (
        <div className="bg-black text-white w-screen h-screen">
            <div className="w-full lg:w-11/12 lg:px-5 xl:w-8/12 2xl:w-1/2 xl:px-10 mx-auto">
                <Navbar />

                <Outlet />

                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;
