import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-32 bg-cyan-100 items-center py-4 shadow-md fixed top-0 left-0 right-0 z-50">
            <div>
                <div className="font-black text-3xl">HireHub</div>
            </div>
            <div className="flex items-center w-full max-w-md">
                <SearchBar />
            </div>
            <div className="flex flex-row-2">
                <Link to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                </Link>
                <div className="flex items-center pl-16">
                    <Link to="/profile" className="text-xl">
                        <Avatar />
                    </Link>
                </div>
            </div>
        </div>
    );
};


function Avatar() {
    return (
        <div className="flex justify-center items-center">
            <div className="relative h-10 w-10 rounded-full items-center justify-center bg-slate-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
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
