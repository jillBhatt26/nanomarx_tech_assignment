import { BsFillTriangleFill } from 'react-icons/bs';
import { IoTriangleOutline } from 'react-icons/io5';

const Story = ({ story }) => {
    return (
        <div className="flex space-x-4">
            <div className="flex flex-col align-middle justify-center text-center">
                <BsFillTriangleFill
                    width={5}
                    height={5}
                    className="text-amber-700 cursor-pointer mx-auto"
                />

                <p className="text-center">{Math.floor(Math.random() * 200)}</p>
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
                        via user1 24 hours ago
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
