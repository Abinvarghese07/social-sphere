import CreatePost from "./CreatePost";
import Sidebar from "./Sidebar";

const CreatePages = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <CreatePost/>
        </div>
    );
};

export default CreatePages;