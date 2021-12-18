import React from 'react';
import './auth.css';
import { Link } from 'react-router-dom';

const Auth = () => {
    return (
        <div className="auth">
            <div className="left-container">
                <h1>Customer Login</h1>
                <div className="auth-button-div">
                    <Link to="/customer/login">
                        {' '}
                        <button className="auth-login-btn">Login</button>
                    </Link>
                    <Link to="/customer/signup">
                        <button>Signup</button>
                    </Link>
                </div>
            </div>
            <div className="right-container">
                <h1>Retailer Login</h1>
                <div className="auth-button-div">
                    <Link to="/retailer/login">
                        {' '}
                        <button className="auth-login-btn">Login</button>
                    </Link>
                    <Link to="/retailer/signup">
                        <button>Signup</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Auth;
