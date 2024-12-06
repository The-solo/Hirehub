import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!searchQuery) {
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/home/search/`, {
                params: {
                    name: searchQuery
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }, 
            });

            const { profiles } = response.data;
            navigate(`/search/user?name=${searchQuery}`, { state: { profiles } });

        } catch (error) {
            console.error('Error while searching:', error);
        }
    };

    return (
        <div className="">
            <div className="flex border-2 border-blue-200 rounded-full overflow-hidden max-w-full font-normal text-gray-500">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for people here...."
                    className="w-96 bg-white text-gray-700 text-sm px-12 py-3 rounded-full"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="flex items-center justify-center bg-black hover:bg-gray-700 px-6 text-sm text-white rounded-full outline-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
