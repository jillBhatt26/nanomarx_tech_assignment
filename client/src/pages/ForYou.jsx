import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Story from '../components/Story';
import Loader from '../components/Loader';
import { StoryServices } from '../services/story';

const ForYouPage = () => {
    // states
    const [fetchStoriesError, setFetchStoriesError] = useState(null);
    const [storiesForYou, setStoriesForYou] = useState([]);
    const [loading, setLoading] = useState(true);

    // hooks
    const authUser = useSelector(state => state.authReducer.user);

    // callbacks
    const fetchStoriesForYouCB = useCallback(async () => {
        try {
            const fetchStoriesForYouRes =
                await StoryServices.fetchStoriesForYou();

            const { success, data, error } = fetchStoriesForYouRes;

            if (success) setStoriesForYou(data.stories);
            else setFetchStoriesError(error);
        } catch (error) {
            setFetchStoriesError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStoriesForYouCB();
    }, [fetchStoriesForYouCB]);

    if (loading) return <Loader />;

    return (
        <div className="px-5 md:px-0">
            {!authUser ? (
                <p className="text-lg text-center text-[#aaa] md:ml-10 my-20">
                    Login to fetch recommendations
                </p>
            ) : (
                <>
                    {/* error message */}
                    {fetchStoriesError && (
                        <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                            {fetchStoriesError}
                        </p>
                    )}

                    {/* Stories */}
                    {storiesForYou.length > 0 ? (
                        <ul className="mt-5">
                            {storiesForYou.map((story, idx) => (
                                <Story key={story._id ?? idx} story={story} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-lg text-center text-[#aaa] md:ml-10 my-20">
                            No stories to recommend now
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default ForYouPage;
