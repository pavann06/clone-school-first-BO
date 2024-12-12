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
    return data;
  } catch (error) {
   
    return error;

  }
};

export const logout = async () => {
  try {
    window.localStorage.clear();
  } catch (error) {
   
    return error;
  }
  return null;
};
