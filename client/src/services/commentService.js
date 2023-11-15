

export const addComment = async (movieId, commentText) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: commentText }),
            credentials: 'include',
        });

        if (response.ok) {
            const newComment = await response.json();
            return newComment;
        } else {
            console.error('Failed to add comment:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error during comment addition:', error);
        return null; 
    }
};

export const deleteComment = async (movieId, commentId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}/comments/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to delete comment:', response.statusText);
            return false; 
        }
    } catch (error) {
        console.error('Error during comment deletion:', error);
        return false; 
    }
};
