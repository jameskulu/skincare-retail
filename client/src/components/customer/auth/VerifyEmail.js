import React, { useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const VerifyEmail = (props) => {
    const token = props.match.params.token;

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await Axios.post(
                    `${process.env.REACT_APP_API_URL}/api/users/email-activate`,
                    {
                        token,
                    }
                );
            } catch (err) {
                toast.error(err.response.data.message);
            }
        };
        verifyEmail();
    });

    return (
        <>
            <div className="above-div">
                <h2>Email Verify</h2>
            </div>
            <div className="main verify-email">
                <h4>Your account has been verified</h4>
                <Link to="/customer/login">
                    <button>Go to login</button>
                </Link>
            </div>
        </>
    );
};

export default VerifyEmail;
