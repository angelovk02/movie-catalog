import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";


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
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
                credentials: "include",
            });

            if (response.ok) {
                const userData = await response.json();

                login()

                navigate('/')
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
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
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
                <div className="form-group">
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
            {errors.message && <p className="error-message">{errors.message}</p>}
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;