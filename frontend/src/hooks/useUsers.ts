import { useEffect, useState } from "react";
import { User } from "../models/User.interface";

interface useUsersProps {
  search: string | null;
};

export const useUsers = ({
  search,
}: useUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);

    const apiUrl = process.env.REACT_APP_API_URI || 'http://localhost:3000/';

    fetch(`${apiUrl}api/users?q=${search || ''}`)
      .then((res) => res.json())
      .then((data) => {
        if ( !data.data || !Array.isArray(data.data)) {
          setError(data.message || 'Unknown error occurred');

        } else {
          setUsers(data.data);
        }
      }).catch((err) => {
        setError(err.message || 'Unknown error occurred');

      }).finally(() => {
        setIsLoading(false);
      });
  }, [search, refreshCount]);

  return {
    users: users,
    usersError: error,
    usersIsLoading: isLoading,
    refreshUsers: () => setRefreshCount(refreshCount + 1),
  };
};
