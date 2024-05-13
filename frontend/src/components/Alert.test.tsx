import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe('Alert', () => {
    it('should display the title and the message', () => {
        const title = 'Error';
        const message = 'An error occurred';

        render(<Alert title={title} message={message} />);

        const titleElement = screen.getByText(title);
        const messageElement = screen.getByText(message);

        expect(titleElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
    });
});
