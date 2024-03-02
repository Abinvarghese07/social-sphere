import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const Protected = ({children}) => {
    const {user} = useContext(AuthContext);
    if(!user){
        return <Navigate to='/'/>
    }

    return children;
};

export default Protected;