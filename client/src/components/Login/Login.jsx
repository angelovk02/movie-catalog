import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import { loginUser } from "../../services/userService";

import loginStyles from './Login.module.css'

const formInitialState = {
    email: '',
    password: '',
}

const Login = () => {
    const [formValues, setFormValues] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const { login } = useAuth()
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };

    const resetFormHandler = () => {
        setFormValues(formInitialState)
        setErrors({})
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formValues);

            if (response.ok) {
                const userData = await response.json();

                login();

                navigate("/");
            } else {
                const errorData = await response.json();
                setErrors({ message: errorData.message });
                alert("Login failed:", errorData.message);
            }
        } catch (error) {
            alert("Error during login:", error);
        }

        resetFormHandler()
    };

    return (
        <div className={loginStyles.container} >
            <div className={loginStyles.card}>
                <h2>Login</h2>
                <form onSubmit={submitHandler}>
                    <div className={loginStyles.formSection}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div className={loginStyles.formSection}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {errors.message && <p className={loginStyles.errorMessage}>{errors.message}</p>}
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;