import axios from "axios";
import { createContext, useEffect, useState } from "react";
import configData from "../config.json";

export const AuthContext = createContext();

export const AuthContexProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  
    // const login = async (inputs) => {
    //     const res = await axios.post(configData.SERVER_URL+'veifyLogin', inputs);
    //     setCurrentUser(res.data);
    //     localStorage.setItem("user", JSON.stringify(currentUser));
    //     setauthenticated(true);
    //     localStorage.setItem("authenticated", true);
    // };
    // const register = async (input) =>{
    //     try {
    //         const res = await axios.post(configData.SERVER_URL , input);
    //         return res.data; // Returnează datele primite de la server în caz de succes
    //     } catch (err) {
    //         throw err; // Aruncă eroarea pentru a fi gestionată în funcția de apel
    //     }
    // }
    const login = async (inputs) => {
        try {
            const res = await axios.post(configData.SERVER_URL + 'veifyLogin', inputs);
          
            if (res.data) {
                
                setCurrentUser(res.data);
                
                localStorage.setItem("user", JSON.stringify(res.data));
               
                setauthenticated(true);
                
                localStorage.setItem("authenticated", true);
            } else {
               
                alert("Numele de utilizator sau parola greșită!");
                
            }
        } catch (err) {
            
            
            alert("Nume sau parola gresita");
            
        }
    };
    const logout = async (inputs) => {
        var answer = window.confirm("Are you sure you want to do that?");
        if (answer) {
            
        // alert('doriti sa va delogati?');
        // const res = await axios.post(configData.SERVER_URL+'logout');
        setauthenticated(false);
        localStorage.setItem("authenticated", false);
        setCurrentUser(null);
        // console.log(res.data);
        }
        else {
            return
        }
        
       
    };

    useEffect(() => {
    //    alert('context');
        
        if(currentUser != null) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            setauthenticated(true);
            localStorage.setItem("authenticated", true);
        }
        else{
            localStorage.setItem("user", null);
            setauthenticated(false);
            localStorage.setItem("authenticated", false);
        }
       
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout, authenticated, }}>
            {children}
        </AuthContext.Provider>
    );
};