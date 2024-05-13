import { render, screen } from "@testing-library/react";
import { User } from "../models/User.interface";
import UserCard from "./UserCard";

describe('UserCard', () => {
    it('should have all props from User interface', () => {
        const user: User = {
            id: 1,
            name: 'John Doe',
            country: 'USA',
            city: 'New York',
            favoriteSport: 'Basketball',
        };

        render(<UserCard data={user} />);
        expect(screen.getByText(user.id)).toBeInTheDocument();
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.country)).toBeInTheDocument();
        expect(screen.getByText(user.city)).toBeInTheDocument();
        expect(screen.getByText(user.favoriteSport)).toBeInTheDocument();
    });
});
