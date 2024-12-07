import { API_BASE_URL } from '../config-global';

export const login = async (email, password) => {
  try {
    const payload = {
      email,
      password,
    };
    const response = await fetch(`${API_BASE_URL}userservice/bo_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;

  }
};

export const logout = async () => {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error(error);
    return error;
  }
  return null;
};
