import { ProfileCardComponent }  from "../components/Profile";
import { EmployerFeed} from "../components/homeFeed";

export const ProfilePage = () => {
    return (
        <div className="flex flex-row overflow-hidden">
            <div className="flex w-1/3 mt-10">
                <div className="fixed top-10 left-0 w-1/3 h-full overflow-hidden pt-8">
                    <ProfileCardComponent />
                </div>
            </div>
            <div className="w-2/3 overflow-y-auto mt-4">
                <EmployerFeed />
            </div>
        </div>
    );
};
