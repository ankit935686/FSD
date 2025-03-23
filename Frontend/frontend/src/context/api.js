import axios from 'axios';

// Set the base URL of your Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for authentication
});

// Register a new student
export const registerStudent = async (userData) => {
    return await api.post("register/", userData);
};

// Login a student
export const loginStudent = async (userData) => {
    return await api.post("login/", userData);
};

// Logout a student
export const logoutStudent = async () => {
    return await api.post("logout/");
};

// Get student profile
export const getStudentProfile = async () => {
    return await api.get("profile/");
};

// GitHub OAuth login URL
export const githubLogin = async () => {
    return await api.get("github/login/");
};
