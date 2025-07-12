const Footer = () => {
    return (
        <div className="mt-20 mb-10 px-4 md:px-0">
            <ul className="flex justify-end space-x-4 text-[13px] font-medium text-[#FFFFFFB0] sm:flex-1 mt-0.5">
                <li className="hover:cursor-pointer">About</li>
                <li className="hover:cursor-pointer">Tags</li>
                <li className="hover:cursor-pointer">Filter</li>
                <li className="hover:cursor-pointer">Moderation Log</li>
            </ul>
        </div>
    );
};

export default Footer;
