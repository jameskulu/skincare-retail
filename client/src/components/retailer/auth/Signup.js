import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import '../../customer/auth/auth.css'

const Signup = () => {
    const history = useHistory();

    const [companyName, setCompanyName] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Two password fields did not match.');
        }

        try {
            const newRetailer = { companyName, location, email, password };
            await Axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/register`,
                newRetailer
            );
            history.push('/retailer/login');
            toast.success(
                'Your account is created successfully. Please check your email for verification.',
            );
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Retailer Signup</h2>
            </div>
            <div className="auth-container">
                <form onSubmit={submit}>
                    <div class="mb-3">
                        <label class="form-label">Company Name</label>
                        <input
                            type="text"
                            class="form-control"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Location</label>
                        <input
                            type="text"
                            class="form-control"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirm Password</label>
                        <input
                            type="password"
                            class="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        SIGNUP
                    </button>
                    <div class="mt-3 text-center">
                        Don't have an account? {" "}
                        <Link to="/retailer/login">
                             Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
