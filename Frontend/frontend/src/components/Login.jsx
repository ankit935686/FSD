import React, { useState } from "react";
import { loginStudent } from "../context/api";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        setLoading(true);

        try {
            const response = await loginStudent(formData);
            setMessage(response.message || "Login successful!");
            setSuccess(true);
            localStorage.setItem("token", response.token); // Store token
            setFormData({ username: '', password: '' }); // Clear form on success
        } catch (error) {
            setMessage(error.message || "Login failed. Please check your credentials.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {message && <p style={{ color: success ? "green" : "red" }}>{message}</p>}
        </div>
    );
};

export default Login;
