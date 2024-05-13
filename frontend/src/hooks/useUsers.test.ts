import { renderHook, waitFor } from "@testing-library/react";
import { User } from "../models/User.interface";
import { useUsers } from "./useUsers";

describe('useUsers', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch users with empty search', async () => {
        const users: User[] = [
            {
                id: 1,
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favoriteSport: 'Basketball',
            }
        ];
        const dataToReturn = {
            data: users,
        };
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataToReturn)
        });

        const { result } = renderHook(() => useUsers({ search: null }));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}api/users?q=`);

        await waitFor(() => {
            expect(result.current.users).toEqual(dataToReturn.data);
        });

        expect(result.current.usersError).toBeNull();
        expect(result.current.usersIsLoading).toBeFalsy();
    });

    it('should return an empty array when there are no users', async () => {
        const dataToReturn = {
            data: [],
        };
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataToReturn)
        });

        const searchText = 'John';
        const { result } = renderHook(() => useUsers({ search: searchText }));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}api/users?q=${searchText}`);

        await waitFor(() => {
            expect(result.current.users).toEqual(dataToReturn.data);
        });

        expect(result.current.usersError).toBeNull();

        await waitFor(() => {
            expect(result.current.usersIsLoading).toBeFalsy();
        });
    });

    it('should return an error message when the fetch fails', async () => {
        const errorMessage = 'Failed to fetch users';
        const errorToReturn = {
            message: errorMessage,
        };
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(errorToReturn)
        });

        const { result } = renderHook(() => useUsers({ search: null }));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}api/users?q=`);

        await waitFor(() => {
            expect(result.current.usersError).toEqual(errorToReturn.message);
        });

        expect(result.current.users).toEqual([]);
        expect(result.current.usersIsLoading).toBeFalsy();
    });

    it('should display an error message when data is not a valid json', async () => {
        const errorMessage = 'Unexpected token < in JSON at position 0';
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockImplementation(async () => {
                throw new Error(errorMessage);
            })
        });

        const { result } = renderHook(() => useUsers({ search: null }));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}api/users?q=`);

        await waitFor(() => {
            expect(result.current.usersError).toEqual(errorMessage);
        });

        expect(result.current.users).toEqual([]);
        expect(result.current.usersIsLoading).toBeFalsy();

    });

    it('should refresh users', async () => {
        const users: User[] = [
            {
                id: 1,
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favoriteSport: 'Basketball',
            }
        ];
        const dataToReturn = {
            data: users,
        };
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataToReturn)
        });

        const { result } = renderHook(() => useUsers({ search: null }));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}api/users?q=`);

        await waitFor(() => {
            expect(result.current.users).toEqual(dataToReturn.data);
        });

        expect(result.current.usersError).toBeNull();
        expect(result.current.usersIsLoading).toBeFalsy();

        const newUsers: User[] = [
            {
                id: 2,
                name: 'Jane Doe',
                city: 'Los Angeles',
                country: 'USA',
                favoriteSport: 'Soccer',
            }
        ];
        const newDataToReturn = {
            data: newUsers,
        };
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(newDataToReturn)
        });

        result.current.refreshUsers();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
        });

        expect(fetch).toHaveBeenNthCalledWith(2, `${process.env.REACT_APP_API_URI}api/users?q=`);

        await waitFor(() => {
            expect(result.current.users).toEqual(newDataToReturn.data);
        });

        expect(result.current.usersError).toBeNull();
        expect(result.current.usersIsLoading).toBeFalsy();
    });
});
