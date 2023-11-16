
import { useState } from 'react';
import { updateUserProfile } from '../../../services/userService';

import editProfileStyles from './EditProfile.module.css'

const EditProfileForm = ({ user, onSave, onCancel }) => {
    const [editedUser, setEditedUser] = useState({
        username: user.username,
        email: user.email,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));

       
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

        setErrors(newErrors);
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUserProfile(editedUser);
            onSave(updatedUser);
        } catch (error) {
            console.error('Error saving profile edits:', error);
        }
    };

    return (
        <form>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                        {errors.username && <p className={editProfileStyles.error}>{errors.username}</p>}

            </label>

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                        {errors.email && <p className={editProfileStyles.error}>{errors.email}</p>}

            </label>

           
            <button type="button" className={editProfileStyles.button} onClick={handleSave}>
                Save Changes
            </button>

            <button type="button" className={editProfileStyles.button} onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default EditProfileForm;
