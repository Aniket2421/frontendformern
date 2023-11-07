import React, { useState } from 'react';
import axios from 'axios';
import "./Registarion.css"

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        userType: 'User', // Default to 'User'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://mernbackend-gvrq.onrender.com/register', formData);
            if (response.status === 201) {
                alert('User registered successfully Please Login!');
                window.location.href = '/login'
                // You can redirect the user to a login page or do something else here.
            } else {
                alert('Registration failed. Please check your information.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please check your information and try again.');
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>User Type:</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="merchant">Merchant</option>
                    </select>
                </div>
                <button type="submit">Register</button>
                <p>If Already Register <a href="/login">Click Here</a> Go to Login Page</p>

            </form>
        </div>
    );
};

export default Registration;
