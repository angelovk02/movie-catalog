export const loginUser = async (credentials) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      const errorData = await response.json();
      alert(errorData.message);
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}



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



export const updateUserProfile = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/editProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (response.ok) {
      const editedUser = await response.json();
      return editedUser
    } else {
      console.error('Failed to fetch user info:', response.statusText);
      return null;
    }

  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};


