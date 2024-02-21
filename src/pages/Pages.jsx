import Homefeed from "./Homefeed";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";

const Pages = () => {
    return (
        <div className="flex justify-around">
            <Sidebar/>
            <Homefeed/>
            <Rightbar/>
        </div>
    );
};

export default Pages;