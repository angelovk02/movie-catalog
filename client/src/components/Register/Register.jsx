import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import { registerUser } from "../../services/userService";

import registerStyles from './Register.module.css'

const formInitialState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
}

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(formInitialState)
    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        e.preventDefault()
        setFormValues(state => ({
            ...state, [e.target.name]: e.target.value
        }))
    }

    const resetFormHandler = () => {
        setFormValues(formInitialState)
        setErrors({})
    }

    const submitHandler = async (e) => {

        e.preventDefault();
        try {
            const userData = await registerUser(formValues);

            if (userData) {
                register();
                navigate('/');
            }
        } catch (error) {
            alert("Error during register:", error);
        }

        resetFormHandler()
    }

    return (
        <div className={registerStyles.container}>
            <div className={registerStyles.card}>
                <h2>Register</h2>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={registerStyles.formSection}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formValues.username}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className={registerStyles.formSection}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className={registerStyles.formSection}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className={registerStyles.formSection}>
                        <label htmlFor="repeatPassword">Repeat Password:</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            value={formValues.repeatPassword}
                            onChange={changeHandler}
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div >
    );
}
export default Register