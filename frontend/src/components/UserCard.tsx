import { User } from "../models/User.interface";

interface UserCardProps {
    data: User;
};
const UserCard: React.FC<UserCardProps> = ({
    data,
}) => {
    return (
        <div className="w-full">
            <div className="bg-white flex flex-col border border-gray-200 shadow rounded-lg p-2">
                <h2 className="text-xl text-gray-900">{data.name}</h2>
                <p className="text-sm text-gray-600">{data.city} - {data.country}</p>
                <p className="text-sm text-gray-600 mt-2">{data.favoriteSport}</p>
            </div>
        </div>
    );
};

export default UserCard;
