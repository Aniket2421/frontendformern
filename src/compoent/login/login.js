import React, { useState } from 'react';
import axios from 'axios';
import "./login.css"

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
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
            const response = await axios.post('https://mernbackend-gvrq.onrender.com/login', formData);
            if (response.status === 200) {
                // Successfully logged in



                console.log(response.data.data.userData);
                localStorage.setItem('userData', JSON.stringify(response.data.data.userData))

                window.location.href = "/dashboard"

            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
                <p>Have Not Registered Yet ? <a href="/register">Register</a></p>

            </form>
        </div>
    );
};

export default Login;
