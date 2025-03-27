import React, { useState } from 'react';
import { registerStudent } from "../context/api";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        student_id: ''
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input changes
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
            const response = await registerStudent(formData);
            setMessage(response.message || "Registration successful!");
            setSuccess(true);
            setFormData({ username: '', email: '', password: '', student_id: '' }); // Clear form only on success
        } catch (error) {
            setMessage(error.message || "Registration failed. Please try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
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
                <input 
                    type="text" 
                    name="student_id" 
                    placeholder="Student ID" 
                    value={formData.student_id} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {message && (
                <p style={{ color: success ? 'green' : 'red' }}>{message}</p>
            )}
        </div>
    );
};

export default Register;
