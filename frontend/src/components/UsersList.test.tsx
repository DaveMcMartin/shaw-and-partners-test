import { render, screen, waitFor } from "@testing-library/react";
import UsersList from "./UsersList";
import { User } from "../models/User.interface";

describe('UsersList', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should contain the searchBar', () => {
        render(<UsersList />);

        const searchBar = screen.getByPlaceholderText('Search for users...');
        expect(searchBar).toBeInTheDocument();
    });

    it('should have a button that opens the csv upload form', () => {
        render(<UsersList />);

        const importButton = screen.getByText('Import from CSV');
        expect(importButton).toBeInTheDocument();
    });

    it('should display a message that there is not users', async () => {
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: [],
            }),
        });
        render(<UsersList />);

        await waitFor(() => {
            const noUsersMessage = screen.getByText('Nothing found...');
            expect(noUsersMessage).toBeInTheDocument();
        });
    });

    it('should a loading message while fetching users', () => {
        // @ts-ignore
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: [],
            }),
        });
        render(<UsersList />);

        const loadingMessage = screen.getByText('Loading...');
        expect(loadingMessage).toBeInTheDocument();
    });

    it('should display users details when users are fetched', async () => {
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
        render(<UsersList />);

        await waitFor(() => {
            const userCardTitle = screen.getByText(users[0].name);
            expect(userCardTitle).toBeInTheDocument();
        });
    });
});
