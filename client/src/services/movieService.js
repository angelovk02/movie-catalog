export const createMovie = async (movieData) => {
    try {
      const response = await fetch('http://localhost:3000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
        credentials: 'include',
      });
  
      if (response.ok) {
        const createdMovie = await response.json();
        return createdMovie;
      } else {
        const errorData = await response.json();
        console.error('Movie creation failed:', errorData.message);
        throw new Error('Movie creation failed');
      }
    } catch (error) {
      console.error('Error during movie creation:', error);
      throw error;
    }
  };



export const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/movies', {
        credentials: 'include',
      });
      if (response.ok) {
        const moviesData = await response.json();
        return moviesData;
      } else {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during movie fetch:', error);
      throw error;
    }
  };



export const fetchMovieById = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
            credentials: 'include',
        });

        if (response.ok) {
            const movieData = await response.json();
            return movieData;
        } else {
            console.error('Failed to fetch movie:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error during movie fetch:', error);
        return null; 
    }
};


export const updateMovie = async (movieId, updatedData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            credentials: 'include', 
        });

        if (response.ok) {
            const updatedMovie = await response.json();
            return updatedMovie;
        } else {
            throw new Error(`Failed to update movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
};

export const getRecentMovies = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/movies/recentMovies')


        if (response.ok) {
            const recentMoviesData = await response.json();
            return recentMoviesData
        } else {
            throw new Error(`Failed to fetch recent movies: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error during recent movie fetch:', error);
        throw error;
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        const result = await response.json();
        console.log('Delete movie response:', result);

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to delete movie:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error during movie deletion:', error);
        return false;
    }
};

