import { render, screen, fireEvent } from "@testing-library/react";
import UploadCsvForm from "./UploadCsvForm";

describe('UploadCsvForm', () => {
    it('should have an input to select a CSV file', () => {
        render(<UploadCsvForm isOpen={true} />);

        const uploadButton = screen.getByText('Upload');
        expect(uploadButton).toBeInTheDocument();
    });

    it('should have a button to upload a CSV file', () => {
        render(<UploadCsvForm isOpen={true} />);

        const fileInput = screen.getByTitle('Select a CSV file to upload');
        expect(fileInput).toBeInTheDocument();
    });

    it('should have a button to close the modal', () => {
        const onClose = jest.fn().mockImplementation(() => {});
        render(<UploadCsvForm isOpen={true} onClose={onClose} />);

        const closeButton = screen.getByText('Cancel');
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not render the modal when isOpen is false', () => {
        const { container } = render(<UploadCsvForm isOpen={false} />);
        expect(container).toBeEmptyDOMElement();
    });
});
