import { useEffect, useState } from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import { IoTriangleOutline } from 'react-icons/io5';

const Story = ({ story }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [timeInfo, setTimeInfo] = useState('24 hours ago');

    // effects
    useEffect(() => {
        const storyDate = new Date(story.createdAt);

        const differenceMS = Date.now() - storyDate;
        const differenceHours = differenceMS / (1000 * 60 * 60); // 1 hour in ms

        // show now upto 10 mins
        if (differenceMS < 1000 * 60 * 10) {
            return setTimeInfo('just now');
        }

        // 1 hour
        if (
            differenceHours > 1000 * 60 * 60 * 1 &&
            differenceHours < 1000 * 60 * 60 * 2
        ) {
            return setTimeInfo('1 hour ago');
        }

        // show hours info till 48 hours
        if (differenceHours < 1000 * 60 * 60 * 48) {
            return setTimeInfo(`${Math.floor(differenceHours)} hours ago`);
        }

        // show days info beyond 48 hours
        const differenceDays = differenceMS / (1000 * 60 * 60 * 24); // 1 day in ms
        return setTimeInfo(`${Math.floor(differenceDays)} days ago`);
    }, [story]);

    return (
        <div className="flex space-x-4">
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

                <p className="text-center mx-auto">
                    {Math.floor(Math.random() * 200)}
                </p>
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
                    <p className="italic font-thin text-[14px] text-[#FFFFFFB0]">
                        {story.domain}
                    </p>
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

                    <p className="border-l-2 border-[#a09f9fb0] font-semibold text-[13px] text-[#cacacab0] pl-2">
                        {Math.floor(Math.random() * 100)} comments
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Story;
