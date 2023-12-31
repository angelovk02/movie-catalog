import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext'

import EditMovieForm from '../EditMovie/EditMovie';

import { updateMovie, deleteMovie, fetchMovieById } from '../../../services/movieService';
import { addComment, deleteComment } from '../../../services/commentService';
import movieDetailsStyles from './MovieDetails.module.css'

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const { authenticated, user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const commentsPerPage = 3

    useEffect(() => {
        const fetchMovieData = async () => {

            const movieData = await fetchMovieById(movieId);

            if (movieData) {
                setMovie(movieData);
                setComments(movieData.comments || []);
            }
        };

        fetchMovieData();
    }, [movieId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        if (comment.trim().length === 0) {
            alert('Empty comment');
            return;
        }

        const newComment = await addComment(movieId, comment);

        if (newComment) {
            setComments([...comments, newComment]);
            setComment('');
        } else {
            console.error('Failed to add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        const isDeleted = await deleteComment(movieId, commentId);

        if (isDeleted) {
            const updatedComments = comments.filter((comment) => comment._id !== commentId);
            setComments(updatedComments);
        } else {
            console.error('Failed to delete comment');
        }
    };

    const handleDeleteMovie = async () => {

        const isDeleted = await deleteMovie(movieId)

        if (isDeleted) {
            navigate('/movies');
        } else {
            console.error('Failed to delete movie')
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
            setMovie(updatedMovie);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving edits:', error);
        }
    };

    const lastCommentIndex = Math.min(currentPage * commentsPerPage, comments.length);
    const firstCommentIndex = Math.max(lastCommentIndex - commentsPerPage, 0);
    const currentComments = comments.slice(firstCommentIndex, lastCommentIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (

        editMode ? (
            <EditMovieForm
                initialData={movie}
                onSave={handleSaveEdits}
                onCancel={() => {
                    setEditMode(false);
                    handleCancelEdit();
                }}
            />
        ) :

            <div className={movieDetailsStyles.movieDetailsContainer}>
                {movie && (
                    <>
                        <div className={movieDetailsStyles.movieContent}>
                            <div className={movieDetailsStyles.movieImage}>
                                <img src={movie.image} alt={`${movie.title} Poster`} />
                            </div>
                            {authenticated && user && user.username === 'Admin00' && !editMode && (
                                <div className={movieDetailsStyles.commentActions}>
                                    <button onClick={handleEditMovie}>Edit Movie</button>
                                    <button onClick={handleDeleteMovie}>Delete Movie</button>
                                </div>
                            )}
                        </div>
                        <div className={movieDetailsStyles.movieDetailsContent}>

                            <h2 className={movieDetailsStyles.movieTitle}>{movie.title}</h2>
                            <p className={movieDetailsStyles.movieCategoryCategory}>Category: {movie.category}</p>
                            <p className={movieDetailsStyles.movieCategoryDirector}>Director: {movie.director}</p>
                            <p className={movieDetailsStyles.movieCategorySummary}>Summary: {movie.summary}</p>

                            <h3>Comments</h3>
                            {comments.length === 0 ? (
                                <p>No comments yet.</p>
                            ) : (
                                <ul className={movieDetailsStyles.commentsContainer}>
                                    {currentComments.map((comment) => (
                                        <li key={comment._id} className={movieDetailsStyles.comment}>
                                            <strong>{comment.userId.username}</strong>: {comment.text}
                                            {authenticated && (user._id === comment.userId._id || user.username === 'Admin00') && (
                                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {comments.length > commentsPerPage && (
                                <div className={movieDetailsStyles.pagination}>
                                    {[...Array(Math.ceil(comments.length / commentsPerPage))].map((_, index) => (
                                        <button key={index} onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {!editMode && authenticated ? (
                                <div className={movieDetailsStyles.commentForm}>
                                    <textarea value={comment} onChange={handleCommentChange} />
                                    <button onClick={handleAddComment}>Add Comment</button>
                                </div>
                            ) : (
                                !authenticated && <p>Login to leave comments</p>
                            )}


                        </div>
                    </>
                )}

            </div>

    );

};

export default MovieDetails;
