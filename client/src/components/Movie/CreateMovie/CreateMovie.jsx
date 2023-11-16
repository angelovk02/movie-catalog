import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import createMovieStyles from './CreateMovie.module.css'

import { createMovie } from '../../../services/movieService';

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

    const navigate = useNavigate();

    const changeHandler = (e) => {
        e.preventDefault()
        setformValuess(state => ({
            ...state, [e.target.name]: e.target.value
        }))
    }

    const resetFormHandler = () => {
        setformValuess(formInitialState)
        setErrors({})
    }


    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.name = `${name} is required`;
        } else {
            delete newErrors.name;
        }

        setErrors(newErrors);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const createdMovie = await createMovie(formValues);

            if (createdMovie) {
                navigate('/movies');
            }
        } catch (error) {
            console.error('Error during movie creation:', error);
        }

        resetFormHandler()
    };

    return (
        <div className={createMovieStyles.container}>
            <div className={createMovieStyles.card}>
                <h2>Create Movie</h2>
                <form onSubmit={submitHandler}>
                    <div className={createMovieStyles.formSection}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <div className={createMovieStyles.formSection}>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <div className={createMovieStyles.formSection}>
                        <label htmlFor="director">Director:</label>
                        <input
                            type="text"
                            id="director"
                            name="director"
                            value={formValues.director}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <div className={createMovieStyles.formSection}>
                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formValues.image}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <div className={createMovieStyles.formSection}>
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            id="summary"
                            name="summary"
                            value={formValues.summary}
                            onChange={changeHandler}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <button type="submit">Create Movie</button>
                </form>
            </div>
        </div>
    );
};

export default CreateMovie;
