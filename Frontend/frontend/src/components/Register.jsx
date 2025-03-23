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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setSuccess(false);

        try {
            const response = await registerStudent(formData);
            setMessage(response.data.message);
            setSuccess(true);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Something went wrong. Please try again.');
            }
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="student_id" placeholder="Student ID" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && (
                <p style={{ color: success ? 'green' : 'red' }}>{message}</p>
            )}
        </div>
    );
};

export default Register;
