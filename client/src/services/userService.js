export const getUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const userInfo = await response.json();
        return userInfo;
      } else {
        console.error('Failed to fetch user info:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error during user info fetch:', error);
      return null;
    }
  };
  