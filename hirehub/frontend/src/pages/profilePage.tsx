import { ProfileCardComponent }  from "../components/Profile";
import { Appbar } from "../components/AppBar";


export const ProfilePage = () => {
    return ( 
        <div>
            <div>
                <Appbar></Appbar>
            </div>
            <div>
                <ProfileCardComponent/>
            </div>
        </div>
    )
}