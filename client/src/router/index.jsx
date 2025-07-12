import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppLayout from '../Layout';
import AppRoute from './AppRoute';

// Pages
import HomePage from '../pages/Home';
import ActivePage from '../pages/Active';
import CommentPage from '../pages/Comment';
import RecentPage from '../pages/Recent';
import SearchPage from '../pages/Search';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    {/* Public Routes */}
                    <Route element={<AppRoute />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/active" element={<ActivePage />} />
                        <Route path="/recent" element={<RecentPage />} />
                        <Route path="/comments" element={<CommentPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Route>

                    {/* Public Auth Blocked Routes */}
                    <Route element={<AppRoute blockAuthenticated />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Route>

                    {/* Error */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
