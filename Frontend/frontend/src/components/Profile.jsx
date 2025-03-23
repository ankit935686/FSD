import React, { useState, useEffect } from "react";
import { getStudentProfile } from "../context/api";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getStudentProfile();
                setProfile(response.data.data);
            } catch (error) {
                setMessage('Please log in first.');
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await logoutStudent();
        setMessage('Logged out successfully');
        setProfile(null);
    };

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Student ID: {profile.student_id}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default Profile;
