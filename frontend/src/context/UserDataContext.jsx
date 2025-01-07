import {createContext, useState } from "react";

export const UserDataContext = createContext(null);

export const UserDataContextProvider = ({children}) =>{
    const [userData, setUserData] = useState({});
    const [sessionCookie, setSessionCookie] = useState(null);// CHANGE HERE AFTER SOME TIME

    const updateUserData = (data) => setUserData(data);
    const updateSessionCookie = (data)=> setSessionCookie(data);

    return <UserDataContext.Provider value={{userData, sessionCookie, updateUserData, updateSessionCookie}}>
        {children}
    </UserDataContext.Provider>
}

export default  UserDataContextProvider;