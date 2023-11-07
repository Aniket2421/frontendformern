import React from 'react';
import { Link } from 'react-router-dom';
import "./landingpage.css"

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1>Welcome to Your Shopping App </h1>
            <p>Please choose an option below:</p>
            <div className="buttons-container">
                <Link to="/register" className="landing-button">
                    Register
                </Link>
                <Link to="/login" className="landing-button">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;