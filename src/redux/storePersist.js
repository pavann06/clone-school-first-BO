function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error(e.message);
    return false;
  }
  return true;
}


export const storePersist = {
  set: (key, state) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key) => {
    const result = window.localStorage.getItem(key);
    if (!result) {
      if (key === 'auth_info') {
        window.localStorage.removeItem('auth_info');
      }
      return false;
    }
    if (isJsonString(result)) {
      return JSON.parse(result);
    }
    window.localStorage.removeItem(key);
    if (key === 'auth') {
      window.localStorage.removeItem('auth_info');
    }
    console.error(
      'error parsing in localStorage , all localstorage removed check this storage key :',
      key
    );
    return false;
  },
  remove: (key) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => window.localStorage,
  clear: () => {
    window.localStorage.clear();
  },
};

export default storePersist;
