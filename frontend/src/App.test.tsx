import { render, screen } from "@testing-library/react";
import App from "./App";

describe('App', () => {
    it('should contain a header', () => {
        render(<App />);

        const header = screen.getByAltText('logo');
        expect(header).toBeInTheDocument();
    });

    it('should container a footer', () => {
        render(<App />);

        const footer = screen.getByText('Made by');
        expect(footer).toBeInTheDocument();
    })

    it('should contain the searchBar', () => {
        render(<App />);

        const searchBar = screen.getByPlaceholderText('Search for users...');
        expect(searchBar).toBeInTheDocument();
    });
});
