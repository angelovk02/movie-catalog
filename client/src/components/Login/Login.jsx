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


    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

       
        if (name === 'email') {
            if (!value.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = 'Email is not valid';
            } else {
                delete newErrors.email;
            }
        }

        if (name === 'password' && !value.trim()) {
            newErrors.password = 'Password is required';
        } else {
            delete newErrors.password;
        }

        setErrors(newErrors);
    };

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

        if(errors.email || errors.password){
            return alert(errors)
        }


        try {
            const response = await loginUser(formValues);

            if (response.ok) {
                const userData = await response.json();

                login();

                navigate("/");
            } else {
                const errorData = await response.json();
                setErrors({ message: errorData.message });
                console.log("Login failed:");
            }
        } catch (error) {
            console.log("Error during login:", error);
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
                            onBlur={handleBlur}
                            required
                        />
                        {errors.email && <p className={loginStyles.errorMessage}>{errors.email}</p>}
                    </div>
                    <div className={loginStyles.formSection}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.password && <p className={loginStyles.errorMessage}>{errors.password}</p>}
                    </div>
                    <button type="submit" >Login</button>
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