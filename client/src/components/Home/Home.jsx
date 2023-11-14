import { useState, useEffect } from 'react'

import MovieCard from '../Movie/MovieCard/MovieCard'

import { getRecentMovies } from '../../services/movieService'

import styles from './Home.module.css'

const Home = () => {
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        fetchRecentMovies()
    }, [])

    const fetchRecentMovies = async () => {
        try {
            const recentMoviesData = await getRecentMovies();
            console.log(recentMoviesData)
            setRecentMovies(recentMoviesData);
        } catch (error) {
            console.error('Error fetching recent movies:', error);
        }
    }

    return(
        <div className={styles.home}>
            <h2>Recently Added Movies</h2>
            {recentMovies && recentMovies.length > 0 ? (
                <div className={styles.recentMoviesList}>
                    {recentMovies.map((movie) => (
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
            ) : (
                <p>No recently added movies.</p>
            )}
        </div>
    );
}

export default Home