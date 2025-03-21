import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Change this if your backend runs on a different host

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerStudent = async (userData) => {
  return api.post("/register_student/", userData);
};

export const loginStudent = async (userData) => {
  return api.post("/login_student/", userData);
};

export const logoutStudent = async () => {
  return api.post("/logout_student/");
};

export const getStudentProfile = async () => {
  return api.get("/get_student_profile/");
};

export const githubLogin = async () => {
  return api.get("/github_login/");
};
