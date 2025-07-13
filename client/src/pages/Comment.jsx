import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Comment from '../components/Comment';
import { CommentServices } from '../services/comment';

const CommentPage = () => {
    // states
    const [loading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [fetchCommentsError, setFetchCommentsError] = useState(null);

    const fetchStoryCommentsCB = useCallback(async () => {
        try {
            const { success, data, error } =
                await CommentServices.fetchComments();

            if (success && data && data.comments)
                return setComments(data.comments);

            return setFetchCommentsError(error);
        } catch (error) {
            setFetchCommentsError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStoryCommentsCB();
    }, [fetchStoryCommentsCB]);

    if (loading) return <Loader />;

    return (
        <div className="px-5 md:px-0">
            <h1 className="font-semibold text-lg md:ml-12">Newest Comments</h1>

            {fetchCommentsError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {fetchCommentsError}
                </p>
            )}

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

export default CommentPage;
