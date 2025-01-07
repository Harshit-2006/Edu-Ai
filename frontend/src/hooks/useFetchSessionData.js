import { useEffect, useContext } from "react";
import service from "../appwrite/appwriteUserAuth";
import { UserDataContext } from "../context/UserDataContext";

function useFetchSessionData(){
    const {userData, updateSessionCookie} = useContext(UserDataContext);
    useEffect(()=>{
        async function fetchSessionData() {
            try{    
                const response = await service.getCurrentUser();
                if(response.err){
                    updateSessionCookie("");
                } else {
                    updateSessionCookie(response);
                }
            } catch(error){
                // console.log("Error fetching the session :",error);
                updateSessionCookie("");
            }
        }
        fetchSessionData();
    },[userData])
}

export default  useFetchSessionData;