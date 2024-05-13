import clsx from "clsx";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

interface UploadCsvFormProps {
    onUsersUploaded?: () => void;
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
};
const UploadCsvForm: React.FC<UploadCsvFormProps> = ({
    onUsersUploaded,
    className,
    isOpen = false,
    onClose,
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsUploading(true);

        let errMessage: string | null = null;
        const fileInput = e.currentTarget.querySelector("input[type=file]") as HTMLInputElement;
        const formEl = e.currentTarget as HTMLFormElement;

        if( !fileInput || !fileInput.files || !fileInput.files.length ) {
            errMessage = 'Please select a file';

        } else if( fileInput.size > 1024 * 1024 * 50 ) {
            errMessage = 'File size should be less than 50MB';
        }

        if( errMessage ) {
            toast.error(errMessage);
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files?.[0] as Blob);

        let isOk = false;

        fetch(`${process.env.REACT_APP_API_URI}api/files`, {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (res.ok) {
                    isOk = true;
                }
                return res.json();
            })
            .then((res) => {
                if( isOk ) {
                    if (onUsersUploaded) {
                        onUsersUploaded();
                    }
                    toast.success(res.message);
                    formEl.reset();

                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                toast.error(err.message || 'Something went wrong');
            })
            .finally(() => {
                setIsUploading(false);
            });
    };

    useEffect(() => {
        if( isOpen ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if( !isOpen ) {
        return null;
    }

    return (
        <div
            className="h-screen w-screen fixed top-0 left-0 z-10 backdrop-contrast-75 flex items-center justify-center"
            onClick={onClose}
        >
            <form
                onSubmit={onSubmit}
                className={clsx("w-full max-w-screen-sm bg-white p-4 rounded-md", className)}
                onClick={(e) => e.stopPropagation()}
            >
                <fieldset className="w-full flex flex-col">
                    <label htmlFor="file" className="text-lg text-gray-900">Select a file to import users</label>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        className="bg-gray-50
                        mt-2
                        cursor-pointer
                        border
                        border-gray-300
                        p-2
                        rounded-md
                        focus:outline-none
                        text-sm
                        text-gray-600
                        file:mr-4
                        file:py-1
                        file:px-4
                        file:rounded-md
                        file:border-0
                        file:text-sm
                        file:font-semibold
                        file:bg-green-50
                        file:text-green-700
                        hover:file:bg-green-100
                        hover:file:cursor-pointer"
                        disabled={isUploading}
                        title="Select a CSV file to upload"
                    />
                    <small className="text-gray-600 text-sm mt-1">Accepts CSV files up to 50MB in size.</small>
                </fieldset>
                <div className="flex gap-4 mt-4">
                    <button
                        type="button"
                        className="w-1/2 bg-gray-500 text-white py-2 px-8 rounded-md text-md cursor-pointer"
                        disabled={isUploading}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 bg-green-500 text-white py-2 px-8 rounded-md text-md cursor-pointer"
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default UploadCsvForm;
