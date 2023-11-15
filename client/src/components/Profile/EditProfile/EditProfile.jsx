
import { useState } from 'react';
import { updateUserProfile } from '../../../services/userService';

import editProfileStyles from './EditProfile.module.css'

const EditProfileForm = ({ user, onSave, onCancel }) => {
    const [editedUser, setEditedUser] = useState({
        username: user.username,
        email: user.email,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
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
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                />
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
