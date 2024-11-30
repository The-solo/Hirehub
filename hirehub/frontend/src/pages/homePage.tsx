import { Appbar } from "../components/AppBar";
import HomeFeed from "../components/homeFeed";

export const HomePage = () => {

    return <div>
        <div>
            <Appbar/>
        </div>
        <div className="flex justify-center py-8">
            <HomeFeed/>
        </div>
    </div>
}



export default HomePage;