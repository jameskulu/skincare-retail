import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './change-password.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const history = useHistory();

    const onChangePassword = async (e) => {
        e.preventDefault();

        try {
            const updatePassword = {
                oldPassword,
                newPassword,
            };

            if (newPassword === confirmPassword) {
                const token = localStorage.getItem('auth-token');
                await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/users/profile/change-password`,
                    updatePassword,
                    { headers: { Authorization: 'Bearer ' + token } }
                );
                toast.success('Password Changed Successfully');
                history.push('/profile');
            } else {
                toast.error('New password and confirm password did not match');
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Change Password</h2>
            </div>
            <div className="change-password-container">
                <div class="container-fluid main">
                    <div class="row">
                        <div class=" col-md-12 col-sm-12">
                            <form class=" col-md-6 offset-md-3 ">
                                <div class="form-group">
                                    <label
                                        for="formGroupExampleInput"
                                        class="font-weight-bold"
                                    >
                                        {' '}
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="oldPassword"
                                        placeholder="Enter Old Password"
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div class="form-group">
                                    <label
                                        for="formGroupExampleInput"
                                        class="font-weight-bold"
                                    >
                                        {' '}
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="newPassword"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div class="form-group">
                                    <label
                                        for="formGroupExampleInput"
                                        class="font-weight-bold"
                                    >
                                        {' '}
                                        Cofirm Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="confirmPassword"
                                        placeholder="Re-enter Password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    type="button"
                                    class="btn password-btn col-md-12 "
                                    onClick={onChangePassword}
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
