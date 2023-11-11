import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './MovieDetails.module.css'

const MovieDetails = () => {
    const { movieId } = useParams()
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

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
            const response = await fetch(`http://localhost:3000/api/items/${movieId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
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

    const handleEditMovie = () => {
        // Navigate to the movie edit page or implement your edit logic
        navigate(`/movies/${movieId}/edit`);
    };

    const handleDeleteMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${movieId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                // Redirect to the movie catalog or home page after deletion
                navigate.push('/');
            } else {
                console.error('Failed to delete movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error during movie deletion:', error);
        }
    };

    return (
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
                                        {comment.text}
                                        {/* Implement editComment and deleteComment functions */}
                                        {/* <button onClick={() => deleteComment(comment._id)}>Delete</button> */}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Comment form */}
                        <div className={styles.commentForm}>
                            <textarea value={comment} onChange={handleCommentChange} />
                            <button onClick={handleAddComment}>Add Comment</button>
                        </div>

                        {/* Edit and delete buttons for the movie */}
                        <div className={styles.commentActions}>
                            <button onClick={handleEditMovie}>Edit Movie</button>
                            <button onClick={handleDeleteMovie}>Delete Movie</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
