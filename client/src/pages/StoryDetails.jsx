import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Loader from '../components/Loader';
import Story from '../components/Story';
import Comment from '../components/Comment';
import { StoryServices } from '../services/story';
import { CommentServices } from '../services/comment';

const StoryDetailsPage = () => {
    // states
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [story, setStory] = useState(null);
    const [inputCommentText, setInputCommentText] = useState('');
    const [createCommentError, setCreateCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [fetchCommentsError, setFetchCommentsError] = useState(null);

    // hooks
    const { id } = useParams();
    const authUser = useSelector(state => state.authReducer.user);

    // callbacks
    const fetchStoryDetailsCB = useCallback(async () => {
        try {
            const { success, data, error } = await StoryServices.fetchStoryID(
                id
            );

            if (success && data && data.story) return setStory(data.story);

            return setError(error);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const fetchStoryCommentsCB = useCallback(async () => {
        try {
            const { success, data, error } =
                await CommentServices.fetchStoryComments(id);

            if (success && data && data.comments)
                return setComments(data.comments);

            return setFetchCommentsError(error);
        } catch (error) {
            setFetchCommentsError(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    // schema
    const createCommentSchema = useMemo(
        () =>
            yup.object({
                text: yup
                    .string('Text must be a string')
                    .trim()
                    .required('Text is required')
                    .min(4, 'Text must be minimum 4 characters')
                    .max(255, 'Text must be maximum 255 characters long'),
                storyID: yup
                    .string('Story info must be a string')
                    .trim()
                    .required('Story info is required')
            }),
        []
    );

    // effects
    useEffect(() => {
        fetchStoryDetailsCB();
    }, [fetchStoryDetailsCB]);

    useEffect(() => {
        fetchStoryCommentsCB();
    }, [fetchStoryCommentsCB]);

    // event handlers
    const handleCreateComment = async e => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const commentInputs = await createCommentSchema.validate({
                text: inputCommentText,
                storyID: id
            });

            const commentResData = await CommentServices.create(commentInputs);

            const { success, data, error } = commentResData;

            if (success && data && data.comment) {
                setStory({
                    ...story,
                    totalComments: ++story.totalComments
                });
                setComments([data.comment, ...comments]);
            }

            setCreateCommentError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError)
                setCreateCommentError(error.message);
            else
                setCreateCommentError(
                    error.error ?? 'Failed to make the comment'
                );
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!loading && !story && error) return <Navigate to="/error" replace />;

    return (
        <div className="px-5 md:px-0">
            <Story story={story} />

            {createCommentError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {createCommentError}
                </p>
            )}

            {fetchCommentsError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {fetchCommentsError}
                </p>
            )}

            <form
                className="mt-5"
                onSubmit={handleCreateComment}
                noValidate
                autoComplete="off"
            >
                <textarea
                    className="w-full min-h-20 max-w-full bg-[#141414] outline-1 outline-[#333] italic placeholder-[#ccc] text-[#bbb] text-sm p-1"
                    disabled={authUser === null}
                    placeholder={
                        authUser === null
                            ? 'You must be logged in to make a comment'
                            : 'Make a comment'
                    }
                    onChange={e => setInputCommentText(e.target.value)}
                ></textarea>

                <button
                    type="submit"
                    className="mt-4 text-sm bg-[#181818] text-white outline-1 outline-[#333] px-3 py-0.5 hover:cursor-pointer hover:bg-[#202020]"
                >
                    Post
                </button>
            </form>

            {comments.length > 0 && (
                <ul className="mt-5">
                    {comments.map((comment, idx) => (
                        <Comment key={comment._id ?? idx} comment={comment} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StoryDetailsPage;
