const API_BASE_URL = "http://localhost:3000/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    GOOGLE: `${API_BASE_URL}/auth/google`,
    GOOGLE_CALLBACK: `${API_BASE_URL}/auth/google/callback`,
  },
};

export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const token = localStorage.getItem("token");
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  });

  return response;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
