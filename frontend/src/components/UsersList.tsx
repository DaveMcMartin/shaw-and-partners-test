import { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useUsers } from "../hooks/useUsers";
import Alert from "./Alert";
import UploadCsvForm from "./UploadCsvForm";
import UserCard from "./UserCard";

const UsersList = () => {
    const [search, setSearch] = useState<string>("");
    const [isUploadModelOpen, setIsUploadModelOpen] = useState<boolean>(false);
    const changeLimiter = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        if(changeLimiter.current) {
            clearTimeout(changeLimiter.current);
        }
        changeLimiter.current = setTimeout(() => {
            setSearch(text);
        }, 500);
    };

    const {
        users,
        usersError,
        usersIsLoading,
        refreshUsers,
    } = useUsers({
        search: search,
    });

    return (
        <div className="w-full px-4 pb-4">
            <SearchBar
                onChange={handleSearchChange}
                className="mt-4"
                onClickImportUsers={() => setIsUploadModelOpen(true)}
            />
            <UploadCsvForm
                onUsersUploaded={() => refreshUsers()} className="mt-4"
                isOpen={isUploadModelOpen}
                onClose={() => setIsUploadModelOpen(false)}
            />
            {usersIsLoading && (
                <div className="w-full flex justify-center items-center">
                    <p className="text-gray-900">Loading...</p>
                </div>
            )}
            {!usersIsLoading && usersError && (
                <Alert title="Oops!" message={usersError} className="mt-4" />
            )}
            {!usersIsLoading && !usersError && users && users.length > 0 && (
                <>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {users.map((user) => (
                            <UserCard key={user.id} data={user} />
                        ))}
                    </div>
                </>
            )}
            {!usersIsLoading && !usersError && users && users.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center mt-8">
                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-600 text-3xl">Nothing found...</p>
                </div>
            )}
        </div>
    );
};

export default UsersList;
