import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import movieCatalogStyles from './MovieCatalog.module.css'

import { fetchMovies } from '../../../services/movieService';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 10

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  const NoMoviesCard = () => (
    <div className={movieCatalogStyles.noMovieCard}>
      <h3>No movies available</h3>
    </div>
  );

  const lastMovieIndex = currentPage * moviesPerPage
  const firstMovieIndex = lastMovieIndex - moviesPerPage
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className={movieCatalogStyles.movieCatalog}>

      <h2>Movie Catalog</h2>
      {movies.length === 0 ? (
        <div className={movieCatalogStyles.movieList}>

          <NoMoviesCard />
        </div>
      ) : (
        <>
          <div className={movieCatalogStyles.movieList}>
            {currentMovies.map((movie) => (
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
          <div className={movieCatalogStyles.pagination}>
            {[...Array(Math.ceil(movies.length / moviesPerPage))].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCatalog;
