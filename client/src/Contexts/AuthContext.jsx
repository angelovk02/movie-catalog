import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() =>{
        const storedAuthStatus = localStorage.getItem('authenticated')
        if(storedAuthStatus){
            setAuthenticated(JSON.parse(storedAuthStatus))
        }
    },[])

    const register = () => {
        setAuthenticated(true);
        localStorage.setItem('authenticated', JSON.stringify(true))
    };
    const login = () => {
        setAuthenticated(true);
        localStorage.setItem('authenticated', JSON.stringify(true))
    };

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('authenticated')
    };

    return (
        <AuthContext.Provider value={{ authenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
