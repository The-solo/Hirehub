
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";

export const Appbar = () => {

    return (
        <div className="border-b flex justify-between px-20 bg-cyan-50 items-center py-4">
            {/* Title */}
            <div>
                <Link to="/home">
                    <div className="font-black text-3xl">HireHub</div>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="flex items-center w-full max-w-md">
                <SearchBar />
            </div>

            {/* Profile Icon */}
            <div className="flex items-center">
                <Link to="/profile" className="text-xl">
                    <Avatar/>
                </Link>
            </div>
        </div>
    );
};

function Avatar() {
    return (
        <div className="flex justify-center items-center">
            <div className="relative inline-flex h-10 w-10 bg-gray-200 rounded-full items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                >
                    <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}
