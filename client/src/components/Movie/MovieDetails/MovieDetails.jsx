import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext'

import EditMovieForm from '../EditMovie/EditMovie';

import { updateMovie } from '../../../services/movieService';

import styles from './MovieDetails.module.css'

const MovieDetails = () => {
    const { movieId } = useParams()
    const navigate = useNavigate();

    const { authenticated, user } = useAuth()



    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchMovieById = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/items/${movieId}`, {
                    credentials: 'include'
                })
                if (response.ok) {
                    const movieData = await response.json();
                    setMovie(movieData);

                    // Assuming comments are an array in the movie data
                    setComments(movieData.comments || []);
                } else {
                    console.error('Failed to fetch movie:', response.statusText);
                }
            } catch (error) {
                console.error('Error during movie fetch:', error);
            }
        };

        fetchMovieById();
    }, [movieId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {

        try {
            const response = await fetch(`http://localhost:3000/api/items/${movieId}/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }),
                credentials: 'include',
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments([...comments, newComment]);
                setComment('');
            } else {
                console.error('Failed to add comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error during comment addition:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${movieId}/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                // Update the comments state to reflect the deletion
                const updatedComments = comments.filter((comment) => comment._id !== commentId);
                setComments(updatedComments);
            } else {
                console.error('Failed to delete comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error during comment deletion:', error);
        }
    };


    const handleDeleteMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${movieId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/movies')
            } else {
                console.error('Failed to delete movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error during movie deletion:', error);
        }
    };

    const handleEditMovie = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
    };

    const handleSaveEdits = async (editedData) => {
        try {
            const updatedMovie = await updateMovie(movieId, editedData);
            setMovie(updatedMovie)
            setEditMode(false);
        } catch (error) {
            console.error('Error saving edits:', error);
        }
    };

    return (

        editMode ? (
            // Display the EditMovieForm component in edit mode
            <EditMovieForm
                initialData={movie}
                onSave={handleSaveEdits}
                onCancel={() => {
                    setEditMode(false);
                    handleCancelEdit();
                }}
            />
        ) :

            <div className={styles.movieDetailsContainer}>
                {movie && (
                    <>
                        <div className={styles.movieImage}>
                            <img src={movie.image} alt={`${movie.title} Poster`} />
                        </div>
                        <div className={styles.movieDetailsContent}>

                            <h2 className={styles.movieTitle}>{movie.title}</h2>
                            <p className={styles.movieCategoryDirector}>Category: {movie.category}</p>
                            <p className={styles.movieCategoryDirector}>Director: {movie.director}</p>
                            <p className={styles.movieSummary}>Summary: {movie.summary}</p>

                            <h3>Comments</h3>
                            {comments.length === 0 ? (
                                <p>No comments yet.</p>
                            ) : (
                                <ul className={styles.commentsContainer}>
                                    {comments.map((comment) => (
                                        <li key={comment._id} className={styles.comment}>
                                            <strong>{comment.userId.username}</strong>: {comment.text}
                                            {authenticated && user && user.username === 'Admin00' && (
                                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Comment form */}
                            {!editMode && authenticated ? (
                                <div className={styles.commentForm}>
                                    <textarea value={comment} onChange={handleCommentChange} />
                                    <button onClick={handleAddComment}>Add Comment</button>
                                </div>
                            ) : (
                                !authenticated && <p>Login to leave comments</p>
                            )}

                            {/* Edit and delete buttons for the movie */}
                            {authenticated && user && user.username === 'Admin00' && !editMode && (
                                <div className={styles.commentActions}>
                                    <button onClick={handleEditMovie}>Edit Movie</button>
                                    <button onClick={handleDeleteMovie}>Delete Movie</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
    );

};

export default MovieDetails;
