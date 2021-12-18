import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
    const history = useHistory();

    const { setUserData } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/login`,
                { email, password }
            );
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.data,
                user_type: 'retailer',
            });
            localStorage.setItem('auth-token', loginResponse.data.token);
            toast.success('You are logged in successfully.');
            history.push('/retailer/dashboard');
        } catch (err) {
            toast.error(`${err.response.data.message}`);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Retailer Login</h2>
            </div>
            <div className="auth-container">
                <form onSubmit={submit}>
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
                    <div class="mb-3 text-right">
                        <Link to="/retailer/forgot-password">
                            Forgot password?
                        </Link>
                    </div>
                    <button type="submit">
                        LOGIN
                    </button>
                    <div class="mt-3 text-center">
                        Already have an account? {" "}
                        <Link to="/retailer/signup">
                             Signup
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
