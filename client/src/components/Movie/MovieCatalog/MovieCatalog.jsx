import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieCatalog.module.css'

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items',{
        credentials: 'include'
      });
      if (response.ok) {
        const moviesData = await response.json();
        setMovies(moviesData);
      } else {
        console.error('Failed to fetch movies:', response.statusText);
      }
    } catch (error) {
      console.error('Error during movie fetch:', error);
    }
  };

  return (
    <div className={styles.movieCatalog}>
      <h2>Movie Catalog</h2>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id} 
            movieId={movie._id}
            title={movie.title}
            category={movie.category}
            director={movie.director}
            image={movie.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;
