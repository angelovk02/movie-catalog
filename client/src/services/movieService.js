export const updateMovie = async (movieId, updatedData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/items/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            credentials: 'include', // Include credentials if using cookies for authentication
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
        const response = await fetch('http://localhost:3000/api/items/recentMovies')


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
