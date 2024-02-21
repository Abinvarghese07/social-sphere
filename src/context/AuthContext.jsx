import { createContext, useEffect, useState } from "react";
import {  signInWithEmailAndPassword , onAuthStateChanged , createUserWithEmailAndPassword , signOut} from "firebase/auth";
import { auth } from "../components/Firebase";


export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children}){
    const[user,setUser] = useState("")
    const [username,setUsername] = useState("");

    
 
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)

    }
    function logOut(){
        return signOut(auth);
    }
    const usernameData = (value) => {
        setUsername(value);

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);

        })
        return () => {
            unsubscribe()
        }
    },[])

    return(
        <AuthContext.Provider value={{signUp, logIn, user,username , logOut , usernameData}}>
            {children}
        </AuthContext.Provider>
    )
}