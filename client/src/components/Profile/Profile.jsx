import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';

import EditProfileForm from './EditProfile/EditProfile';

import profileStyles from './Profile.module.css'

const ProfilePage = () => {
    const imageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAMAAACZHrEMAAAAY1BMVEX///8zMzMvLy8rKyshISEoKCgkJCT7+/seHh4TExMAAAAbGxtycnL19fVcXFwODg5OTk7j4+OYmJjJycm+vr7s7OzX19fPz8+EhIRDQ0NiYmJ9fX2tra2goKBra2uRkZE8PDxi1wwmAAADUElEQVR4nO2a2XajMAxA8QYGs9jshC3//5VDmpw2bYG4jVHmzOg+tU+5x5JlSYnnIQiCIAiCIAiCIAiCIIgrknrI22nq56GpXmsS1K0mnPtCCM5ZN5XJ61yKNPMpeYeKjAwv0jEnycgXKD+Xr3Apifiq8qYj5wDcZc7WVC4oDRyqYA63XAjhKey9GndcFpsTZKRKvuey2PRwLgml+zIkg7tT/YODWe7UGSptmm/lZSVQOZBM7D+WIRwmh6vNCnOPGkBkBmkjwyaIowlii5RZoBApXHWP7vWVrACQMbvF9wM5AsgUVvlLiIgBZAZlJ0NTAJnRVkb/bzK2YWIQYWr+pgQ2liejIK62ddFrAGS83u45gOlo7DKYxSA9RGL1HoRAjWdv0VxRBuPi1RYZDPJMvpE/zBqagk2VCXl0NhFEM3Oj9vdtJNRs8MZ+H8whXoJ7m2jnXCbANURSxMYb2FakZOwFeQHjEwxaKm28hqyWG7Y8kEGbKT0cX4GDgYTLkbCw8ZJWfttd0TCtvUrLy1/kaJ0m5dfoUDYHnpmIuns1KWe6DLyyE7d/00Mf7jH8+Gypl1piRp1Fivu+L7OIzMuHm1i9JxM7sKcx6afKS5UuL21CPeTznA9FddkLx+pT6FRqDnLpvqYIlbot39uWpM5T8TWpRXeITU1Wmirqh+H51LdtO2mZ8ZXbzkjt3sWsudxyWQhfiK2yw4jzs0m0XbO5ZuN8Lxw/XONt4/qpslsQbSGdbrHs2t5NqHQZqNZmpbgDn925mOdULri7Ue1TGXNBtq5ckucPhhBXL/ijry1s4K5mun71K7efIRx9z5JYrh12oZ2b2212em97Ijf3qXyu4t1wtAh4tuJd8d3UPcvvCh7A3LyWJwf5u8icXLgEv+9k7qHaSdkrOgdJw4SjQaGKs2cjFXbuRqhGP/VU+mx0OVwmo//rWDEVux4QqvZ3Oiw8HTHkmv7842AJkRYHjf8mV+EP7jmVUXzkbi8oJ6qsrhblfjoevbEP6lH7fHN+vMKW/JqBlldm6LsoFGuLNEqFitg0HjBgb5OYsj3pM/X59Zdxy7i9/MVIl/ZDncD/6upi1JTDOPfxNMV9m49lUVev8EAQBEEQBEEQBEEQBEH+Qf4AGjUrhRhrUzIAAAAASUVORK5CYII='
    const { user,refreshUserInfo } = useAuth();
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);



    useEffect(() => {
        setEditedUserInfo({
            username: user?.username || '',
            email: user?.email || '',
        });
    }, [user]);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleSaveEdits = (editedUser) => {

        refreshUserInfo()

        setIsEditMode(false);

    };


    return (
        <div className={profileStyles.profileContainer}>
            <div className={profileStyles.profileCard}>
                <div className={profileStyles.profileImage}>
                    <img src={imageSrc} />
                </div>
                {isEditMode ? (
                    <EditProfileForm user={user} onSave={handleSaveEdits} onCancel={handleCancelEdit} />
                ) : (
                    <div className={profileStyles.profileInfo}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        {/* Add other user information */}
                        <button className={profileStyles.editButton} onClick={handleEditClick}>
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
