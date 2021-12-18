import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/reset-password`,
                {
                    email,
                }
            );
            setEmail('');
            toast.success('Link has been sent to your email.');
        } catch (err) {
            toast.error(`${err.response.data.message}`);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Forgot Password</h2>
            </div>
            <div className="auth-container">
                <form class="mb-3">
                    <label class="form-label">Email address</label>
                    <input
                        type="text"
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="mt-3" onClick={submit}>
                        SEND
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
