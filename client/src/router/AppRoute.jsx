import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppRoute = ({ blockAuthenticated = false }) => {
    // hooks
    const user = useSelector(state => state.authReducer.user);

    if (user && blockAuthenticated) <Navigate to="/" replace />;

    return <Outlet />;
};

export default AppRoute;
