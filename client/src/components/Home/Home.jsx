import { useState, useEffect } from 'react'

import MovieCard from '../Movie/MovieCard/MovieCard'

import { getRecentMovies } from '../../services/movieService'

import homeStyles from './Home.module.css'

const Home = () => {
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        fetchRecentMovies()
    }, [])

    const fetchRecentMovies = async () => {
        try {
            const recentMoviesData = await getRecentMovies();
            setRecentMovies(recentMoviesData);
        } catch (error) {
            console.error('Error fetching recent movies:', error);
        }
    }
    return (
        <div className={homeStyles.home}>
            {recentMovies && recentMovies.length > 0 ? (
                <div className={homeStyles.recentMoviesContainer}>
                    <h2>Recently Added Movies</h2>
                    <div className={homeStyles.recentMoviesList}>
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
                </div>
            ) : (
                <div className={homeStyles.noMoviesCard}>
                    <h3>No recently added movies.</h3>
                    <p>Check back later for updates!</p>
                </div>
            )}
        </div>
    );
}

export default Home