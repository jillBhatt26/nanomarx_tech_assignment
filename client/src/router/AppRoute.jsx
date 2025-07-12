import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingPage from '../pages/Loading';
import { AuthServices } from '../services/auth';
import { setUser } from '../store/slices/auth';

const AppRoute = ({ blockAuthenticated = false }) => {
    const [, setError] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    // hooks
    const authUser = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const location = useLocation();

    // callbacks
    const fetchActiveUserCB = useCallback(async () => {
        if (authUser) return;

        try {
            const fetchUserData = await AuthServices.active();

            if (fetchUserData.success) dispatch(setUser(fetchUserData.data));
        } catch (error) {
            setError(error);
        } finally {
            setIsFetchingUser(false);
        }

        // eslint-disable-next-line
    }, [authUser, location.pathname]);

    useEffect(() => {
        fetchActiveUserCB();
    }, [fetchActiveUserCB]);

    if (isFetchingUser && !authUser) return <LoadingPage />;

    if (authUser && blockAuthenticated) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default AppRoute;
