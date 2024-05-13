import clsx from "clsx";

interface SearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickImportUsers: () => void;
    className?: string;
};
const SearchBar: React.FC<SearchBarProps> = ({
    onChange,
    onClickImportUsers,
    className,
}) => {
    return (
        <div className={clsx("w-full flex", className)}>
            <div className="flex-grow relative mr-4">
                <input
                    type="text"
                    placeholder="Search for users..."
                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    onChange={onChange}
                />
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-2.5">
                    <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <button
                type="button"
                className="bg-green-500 text-white py-2 px-8 rounded-md text-md cursor-pointer"
                onClick={onClickImportUsers}
            >
                Import from CSV
            </button>
        </div>
    );
};

export default SearchBar;
