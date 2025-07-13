import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTriangleFill } from 'react-icons/bs';
import { IoTriangleOutline } from 'react-icons/io5';
import useTimeInfo from '../hooks/useTimeInfo';

const Comment = ({ comment }) => {
    // states
    const [isHovered, setIsHovered] = useState(false);

    // hooks
    const timeInfo = useTimeInfo(comment.createdAt);

    return (
        <div className="flex space-x-3 max-w-full w-fit my-4">
            <div className="flex flex-col">
                <div
                    className="w-5 h-5 mx-auto flex justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <BsFillTriangleFill
                            width={5}
                            height={5}
                            className="text-amber-700 cursor-pointer mx-auto"
                        />
                    ) : (
                        <IoTriangleOutline
                            width={5}
                            height={5}
                            className="text-white cursor-pointer mx-auto"
                        />
                    )}
                </div>

                <p className="text-center mx-auto">0</p>
            </div>
            <div>
                <div className="flex space-x-2">
                    <img
                        src={`https://picsum.photos/200?random=${Math.random()}`}
                        className="max-w-full h-5 w-5 rounded-full"
                    />
                    <small className="text-[#ddd]">
                        {comment.username} {timeInfo}
                    </small>

                    {comment.storyTitle && (
                        <small className="text-[#ddd] border-l border-[#ddd] px-2">
                            on:{' '}
                            <Link to={`/s/${comment.storyID}`}>
                                {comment.storyTitle}
                            </Link>
                        </small>
                    )}
                </div>
                <h1 className="mt-1">{comment.text}</h1>
            </div>
        </div>
    );
};

export default Comment;
