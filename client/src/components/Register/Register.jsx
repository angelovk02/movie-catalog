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
    const [submitting, setSubmitting] = useState(false);


    const changeHandler = (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        if (name === 'username') {
            if (!value.trim()) {
                newErrors.username = 'Username is required';
            } else if (value.length < 4) {
                newErrors.username = 'Username should be at least 4 characters long';
            } else {
                delete newErrors.username;
            }
        }


        if (name === 'email') {
            if (!value.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = 'Email is not valid';
            } else {
                delete newErrors.email;
            }
        }

        if (name === 'password') {
            if (!value.trim()) {
                newErrors.password = 'Password is required';
            } else if (value.length < 6) {
                newErrors.password = 'Password should be at least 6 characters long';
            } else {
                delete newErrors.password;
            }
        }

        if (name === 'repeatPassword') {
            if (!value.trim()) {
                newErrors.repeatPassword = 'Repeat Password is required';
            } else if (value !== formValues.password) {
                newErrors.repeatPassword = 'Passwords do not match';
            } else {
                delete newErrors.repeatPassword;
            }
        }

        setErrors(newErrors);
    };

    const resetFormHandler = () => {
        setFormValues(formInitialState);
        setErrors({});
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            if (Object.keys(errors).length > 0) {
                setSubmitting(false);
                return;
            }
            const userData = await registerUser(formValues);

            if (userData) {
                register();
                navigate('/');
            }

        } catch (error) {
            console.error('Error during registration:', error);
        }

        resetFormHandler();
        setSubmitting(false);

    };



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
                            onBlur={handleBlur}
                            required
                        />
                        {errors.username && <p className={registerStyles.error}>{errors.username}</p>}
                    </div>

                    <div className={registerStyles.formSection}>
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
                        {errors.email && <p className={registerStyles.error}>{errors.email}</p>}
                    </div>

                    <div className={registerStyles.formSection}>
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
                        {errors.password && <p className={registerStyles.error}>{errors.password}</p>}
                    </div>

                    <div className={registerStyles.formSection}>
                        <label htmlFor="repeatPassword">Repeat Password:</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            value={formValues.repeatPassword}
                            onChange={changeHandler}
                            onBlur={handleBlur}

                            required
                        />
                        {errors.repeatPassword && <p className={registerStyles.error}>{errors.repeatPassword}</p>}
                    </div>

                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
export default Register