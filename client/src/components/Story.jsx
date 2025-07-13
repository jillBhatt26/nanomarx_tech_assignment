import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTriangleFill } from 'react-icons/bs';
import { IoTriangleOutline } from 'react-icons/io5';
import useTimeInfo from '../hooks/useTimeInfo';

const Story = ({ story }) => {
    const [isHovered, setIsHovered] = useState(false);

    // hooks
    const timeInfo = useTimeInfo(story.createdAt);

    return (
        <div className="flex space-x-4 my-2">
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

            <div className="flex flex-col">
                <div className="flex flex-wrap space-x-2">
                    {/* Title with link */}
                    <a href={story.url}>
                        <p className="text-[16px] font-semibold text-[#81b1ff]">
                            {story.title}
                        </p>
                    </a>

                    {/* Tags */}
                    {story.tags.length > 0 && (
                        <ul className="flex space-x-2">
                            {story.tags.map((tag, idx) => (
                                <li
                                    className="text-[12px] min-w-10 text-center rounded-md font-semibold bg-[#3b320d] border border-[#746b4d]"
                                    key={idx}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Domain */}
                    <a
                        href={story.domain}
                        className="italic font-thin text-[14px] text-[#FFFFFFB0]"
                    >
                        {story.domain.split('/').pop()}
                    </a>
                </div>

                <div className="flex flex-wrap space-x-2">
                    <img
                        src={`https://picsum.photos/200?random=${Math.random()}`}
                        className="max-w-full h-5 w-5 rounded-full"
                    />
                    <p className="font-semibold text-[13px] text-[#cacacab0]">
                        via {story.username} {timeInfo}
                    </p>
                    <p className="border-l-2 border-[#a09f9fb0] font-semibold text-[13px] text-[#cacacab0] pl-2">
                        caches
                    </p>

                    <Link to={`/s/${story._id}`}>
                        <span className="border-l-2 border-[#a09f9fb0] font-semibold text-[13px] text-[#cacacab0] pl-2">
                            {story.totalComments} comments
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Story;
