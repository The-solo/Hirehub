import { useLocation } from 'react-router-dom';
import { NoProfilesError } from '../components/Skeletons';

interface Profile {
    id: string;
    name: string;
    email: string;
    description: string;
}

export const SearchResultsPage = () => {
    const location = useLocation(); //To get the data locally from searchBar component results.
    const profiles: Profile[] = location.state?.profiles || [];  // Get profiles from state, or default to an empty array

    if (!profiles || profiles.length === 0) {
        return <div>
            <NoProfilesError/>
        </div>;
    }

    return (
        <div className="container mx-auto p-6 pt-20 bg-slate-100 h-screen">
            <h1 className="text-4xl font-bold text-center mb-">Search Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {profiles.map((profile) => (
                    <div key={profile.id} className="bg-violet-100 border-2 border-gray-200 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-black mb-2">{profile.name}</h2>
                            <p className="text-md text-gray-600 mb-4">Email: {profile.email}</p>
                            <p className="text-md text-gray-700">About : {profile.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultsPage;
