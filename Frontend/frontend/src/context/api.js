import axios from 'axios';

// Base URL for Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api/student/";

// Create Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for authentication
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    }
});

// Automatically attach authentication token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

/**
 * Register a new student
 * @param {Object} userData { username, email, password, student_id }
 */
export const registerStudent = async (userData) => {
    try {
        const response = await api.post("register/", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};

/**
 * Login a student
 * @param {Object} userData { username, password }
 */
export const loginStudent = async (userData) => {
    try {
        const response = await api.post("login/", userData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Save token
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};

/**
 * Logout a student
 */
export const logoutStudent = async () => {
    try {
        const response = await api.post("logout/");
        localStorage.removeItem("token"); // Remove token on logout
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Logout failed" };
    }
};

/**
 * Get student profile
 */
export const getStudentProfile = async () => {
    try {
        const response = await api.get("profile/");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch profile" };
    }
};

/**
 * Get GitHub OAuth login URL
 */
export const githubLogin = async () => {
    try {
        const response = await api.get("github_login/");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "GitHub login failed" };
    }
};

/**
 * GitHub OAuth callback
 * @param {String} code - GitHub authorization code
 */
export const githubCallback = async (code) => {
    try {
        const response = await api.get(`github_callback/?code=${code}`);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Save token
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "GitHub authentication failed" };
    }
};
