import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth()

    useEffect(() => {
        const logoutUser = async () => {
            try {

                const response = await fetch("http://localhost:3000/api/logout", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    logout()

                    navigate('/')
                    
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("Error during logout:", error);
            }



        };

        logoutUser();
    }, []);


};

export default Logout;