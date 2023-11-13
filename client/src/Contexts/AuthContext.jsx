import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('authenticated')
        if (storedAuthStatus) {
            setAuthenticated(JSON.parse(storedAuthStatus))

            if (JSON.parse(storedAuthStatus)) {

                fetchUserInfo();
            }
        }
    }, [])

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        setUser(userInfo);
    };

    const register = () => {
        setAuthenticated(true);
        localStorage.setItem('authenticated', JSON.stringify(true))
        fetchUserInfo();
    };
    const login = () => {
        setAuthenticated(true);
        localStorage.setItem('authenticated', JSON.stringify(true));
        fetchUserInfo();
    };

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('authenticated')
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated,user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
