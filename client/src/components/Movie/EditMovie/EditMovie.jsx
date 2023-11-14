import { updateMovie } from '../../../services/movieService';

import { useState } from 'react';

const EditMovieForm = ({ initialData, onSave, onCancel }) => {
    const [editedData, setEditedData] = useState(initialData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {

            const updatedMovie = await updateMovie(initialData._id, editedData);

            onSave(updatedMovie);
        } catch (error) {
            console.error('Error saving edits:', error);
        }
    };

    return (
        <form>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={editedData.title}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Category:
                <input
                    type="text"
                    name="category"
                    value={editedData.category}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Director:
                <input
                    type="text"
                    name="director"
                    value={editedData.director}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Image URL:
                <input
                    type="text"
                    name="image"
                    value={editedData.image}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Summary:
                <textarea
                    name="summary"
                    value={editedData.summary}
                    onChange={handleInputChange}
                />
            </label>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
            <button type="button" onClick={handleSave}>
                Save Changes
            </button>
        </form>
    );
};

export default EditMovieForm;
