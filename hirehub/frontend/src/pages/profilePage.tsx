import ProfileCardComponent from "../components/Profile";
import { Appbar } from "../components/AppBar";

export const profilePage = () => {

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