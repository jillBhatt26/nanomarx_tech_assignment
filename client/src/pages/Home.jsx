import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Story from '../components/Story';
import Loader from '../components/Loader';
import { StoryServices } from '../services/story';

const HomePage = () => {
    // states
    const [inputTitle, setInputTitle] = useState('');
    const [inputURL, setInputURL] = useState('');
    const [inputTags, setInputTags] = useState('');
    const [createStoryError, setCreateStoryError] = useState(null);
    const [fetchStoriesError, setFetchStoriesError] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // hooks
    const authUser = useSelector(state => state.authReducer.user);

    // callbacks
    const fetchStoriesCB = useCallback(async () => {
        try {
            const fetchStoriesData = await StoryServices.fetchStories();

            const { success, data, error } = fetchStoriesData;

            if (success) setStories(data.stories);
            else setFetchStoriesError(error);
        } catch (error) {
            setFetchStoriesError(error);
        } finally {
            setLoading(false);
            setInputTags('');
            setInputTitle('');
            setInputURL('');
        }
    }, []);

    // schema
    const createStoryInputSchema = useMemo(
        () =>
            yup.object({
                title: yup
                    .string('Title must be a string')
                    .trim()
                    .required('Title is required')
                    .min(4, 'Title must be minimum 4 characters')
                    .max(255, 'Title must be maximum 255 characters long'),
                url: yup
                    .string('Title must be a string')
                    .trim()
                    .required('Title is required')
                    .min(4, 'Title must be minimum 4 characters')
                    .max(255, 'Title must be maximum 255 characters long'),
                tags: yup.array().of(yup.string())
            }),
        []
    );

    // effects
    useEffect(() => {
        fetchStoriesCB();
    }, [fetchStoriesCB]);

    // event handlers
    const handleCreateStory = async e => {
        e.preventDefault();

        const tagsArray = inputTags.split(', ');

        try {
            const createStoryInputs = await createStoryInputSchema.validate({
                title: inputTitle,
                url: inputURL,
                tags: tagsArray
            });

            const createStoryResponseData = await StoryServices.create(
                createStoryInputs
            );

            const { success, data, error } = createStoryResponseData;

            if (success && data && data.story) {
                return setStories([
                    {
                        ...data.story,
                        username: authUser.username,
                        totalComments: 0
                    },
                    ...stories
                ]);
            }

            setCreateStoryError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError)
                setCreateStoryError(error.message);
            else
                setCreateStoryError(
                    error.error ?? 'Failed to create new story'
                );
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            {/* Title */}
            <h1 className="text mb-5">Create new story</h1>

            {/* Error messages */}
            {createStoryError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {createStoryError}
                </p>
            )}

            {fetchStoriesError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {fetchStoriesError}
                </p>
            )}

            {/* Create Story Form */}
            <form
                className="space-y-5"
                onSubmit={handleCreateStory}
                noValidate
                autoComplete="off"
            >
                <div className="flex flex-col lg:flex-row justify-between space-x-5 md:space-x-20 space-y-2 lg:space-y-0">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputTitle}
                        onChange={e => setInputTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col lg:flex-row justify-between space-x-5 md:space-x-20 space-y-2 lg:space-y-0">
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputURL}
                        onChange={e => setInputURL(e.target.value)}
                    />
                </div>

                <div className="flex flex-col lg:flex-row justify-between space-x-5 md:space-x-20 space-y-2 lg:space-y-0">
                    <label htmlFor="tags">Tags:</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="(Comma separated)"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 max-w-xl px-2 py-1"
                        value={inputTags}
                        onChange={e => setInputTags(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="text-sm bg-[#181818] text-white outline-1 outline-[#333] px-3 py-0.5 hover:cursor-pointer hover:bg-[#202020]"
                >
                    Create
                </button>
            </form>

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

export default HomePage;
