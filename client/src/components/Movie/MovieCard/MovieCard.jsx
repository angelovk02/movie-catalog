
import { Link } from 'react-router-dom';

import styles from './MovieCard.module.css'
const MovieCard = ({ title, category, director, image, movieId }) => {
    const cardStyle = {
        backgroundImage: `url(${image})`,
    }
  return (
    <div className={styles.movieCard} style={cardStyle}>
      {/* <img src={image} alt={`${title} Poster`} className={styles.moviePoster} /> */}
      <div className={styles.movieDetails}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <p className={styles.movieCategory}>Category: {category}</p>
        <p className={styles.movieDirector}>Director: {director}</p>
        <Link to={`/movies/${movieId}`} className={styles.detailsButton}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;