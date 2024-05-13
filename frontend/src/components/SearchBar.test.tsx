import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe('SearchBar', () => {
    it('should display a message in the placeholder', () => {
        render(<SearchBar onChange={() => {}} onClickImportUsers={() => {}} />);

        const searchInput = screen.getByPlaceholderText('Search for users...');
        expect(searchInput).toBeInTheDocument();
    });

    it('should call the onChange function when the input changes', () => {
        const onChange = jest.fn().mockImplementation(() => {});

        render(<SearchBar onChange={onChange} onClickImportUsers={() => {}} />);

        const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search for users...');
        expect(searchInput).toBeInTheDocument();

        fireEvent.change(searchInput, { target: {
            value: 'test'
        }});

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the onClickImportUsers function when the button is clicked', () => {
        const onClickImportUsers = jest.fn().mockImplementation(() => {});

        render(<SearchBar onChange={() => {}} onClickImportUsers={onClickImportUsers} />);

        const importButton = screen.getByText('Import from CSV');
        expect(importButton).toBeInTheDocument();
        fireEvent.click(importButton);

        expect(onClickImportUsers).toHaveBeenCalledTimes(1);
    });
});
