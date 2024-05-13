import clsx from "clsx";

interface AlertProps {
    title: string;
    message: string;
    className?: string;
};
const Alert: React.FC<AlertProps> = ({
    title,
    message,
    className,
}) => {
    return (
        <div
            className={clsx("bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", className)}
            role="alert"
        >
            <strong className="font-bold mr-2">{title}</strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default Alert;
