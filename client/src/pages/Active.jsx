import { useCallback, useEffect, useState } from 'react';
import Story from '../components/Story';
import Loader from '../components/Loader';
import { StoryServices } from '../services/story';

const ActivePage = () => {
    // states
    const [fetchStoriesError, setFetchStoriesError] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // callbacks
    const fetchStoriesCB = useCallback(async () => {
        try {
            const fetchActiveStoriesRes =
                await StoryServices.fetchStoriesActive();

            const { success, data, error } = fetchActiveStoriesRes;

            if (success) setStories(data.stories);
            else setFetchStoriesError(error);
        } catch (error) {
            setFetchStoriesError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // effects
    useEffect(() => {
        fetchStoriesCB();
    }, [fetchStoriesCB]);

    if (loading) return <Loader />;

    return (
        <div className="px-5 md:px-0">
            <small className=" italic text-[#aaa] md:ml-10">
                Stories with active discussions.
            </small>

            {/* error message */}
            {fetchStoriesError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {fetchStoriesError}
                </p>
            )}

            {/* Stories */}
            {stories.length > 0 && (
                <ul className="mt-5">
                    {stories.map((story, idx) => (
                        <Story key={story._id ?? idx} story={story} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActivePage;
