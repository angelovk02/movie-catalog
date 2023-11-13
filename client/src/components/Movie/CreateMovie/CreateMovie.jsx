import { useState } from 'react';
import { useNavigate  } from "react-router-dom";

const formInitialState = {
    title: '',
    category: '',
    director: '',
    image: '',
    summary: '',
}



const CreateMovie = () => {
    const [formValues, setformValuess] = useState(formInitialState)

    const [errors, setErrors] = useState({})

    const navigate = useNavigate ();

    const changeHandler = (e) => {
        e.preventDefault()
        setformValuess(state => ({
            ...state, [e.target.name]: e.target.value
        }))
    }

    const resetFormHandler = () =>{
        setformValuess(formInitialState)
        setErrors({})
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/items', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
              credentials: 'include'
            });
      
            if (response.ok) {
              const createdMovie = await response.json();

              navigate('/movies')
            } else {
              const errorData = await response.json();
              console.error('Movie creation failed:', errorData.message);
            }
          } catch (error) {
            console.error('Error during movie creation:', error);
          }
  
        resetFormHandler()
    };

    return (
        <div className="container">
            <h2>Create Movie</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formValues.title}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formValues.category}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="director">Director:</label>
                    <input
                        type="text"
                        id="director"
                        name="director"
                        value={formValues.director}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formValues.image}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formValues.summary}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <button type="submit">Create Movie</button>
            </form>
        </div>
    );
};

export default CreateMovie;
