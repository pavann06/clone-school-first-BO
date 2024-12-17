// import { API_BASE_URL } from '../config-global';

// export const login = async (mobile, password) => {
//   try {
//     const payload = {
//       mobile,
//       password,
//     };
//     const response = await fetch(`https://dev-api.familifirst.com/userservice/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
   
//     return error;

//   }
// };

// export const logout = async () => {
//   try {
//     window.localStorage.clear();
//   } catch (error) {
   
//     return error;
//   }
//   return null;
// };


import { API_BASE_URL } from '../config-global';

export const login = async (mobile, password) => {
  try {
    const payload = {
      mobile,
      password,
    };

    const response = await fetch(`https://dev-api.familifirst.com/userservice/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      // Destructure access_token and refresh_token
      const { access_token, refresh_token } = data.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      console.log('Login successful:', data.description);
    } else {
      console.error('Login failed:', data.description);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return error;
  }
};

export const logout = async () => {
  try {
    // Clear tokens and other stored data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Logout successful.');
  } catch (error) {
    console.error('Logout error:', error);
    return error;
  }
  return null;
};
