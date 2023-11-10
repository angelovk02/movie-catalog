import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate  } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";


const formInitialState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
}

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate ();

    const [formValues, setFormValues] = useState(formInitialState)
    const [errors, setErrors] = useState({})

    const changeHandler = (e) =>{
        e.preventDefault()
        setFormValues(state => ({
            ...state, [e.target.name]: e.target.value
        }))
    }

    const resetFormHandler = () =>{
        setFormValues(formInitialState)
        setErrors({})
    }

    const submitHandler = async (e) =>{

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
                credentials: 'include'
            });
    
            if (response.ok) {
                const userData = await response.json();

                register()

                navigate('/')
           
            } else {
                const errorData = await response.json();
                setErrors({ message: errorData.message });
                alert('Registration failed:', errorData.message);
            }
        } catch (error) {
            alert('Error during registration:', error);
        }
 
        resetFormHandler()
    }
    
    return (
        <div className="container">
            <h2>Register</h2>
            <form method="POST" onSubmit={submitHandler}>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formValues.username}
                    onChange={changeHandler}
                 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formValues.email}
                    onChange={changeHandler}
                    
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
                    />
                </div>

                <div className="form-group">
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
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}
export default Register