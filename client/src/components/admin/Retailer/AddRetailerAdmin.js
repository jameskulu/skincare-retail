import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const AddUser = () => {
    const history = useHistory();

    const [companyName, setCompanyName] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [image, setImage] = useState();

    const onUserAdd = async (e) => {
        e.preventDefault();
        try {
            const newUser = new FormData();
            newUser.append('image', image);
            newUser.append('companyName', companyName);
            newUser.append('location', location);
            newUser.append('email', email);
            newUser.append('password', password);

            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers/new`,
                newUser,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('New retailer has been added.');

            history.push('/admin/retailers');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Add Retailer</h3>
                <form className="mt-4" action="" onSubmit={onUserAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Company Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control fname"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Location</label>
                        <input
                            type="text"
                            id="Location"
                            className="form-control fname"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Email</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Password</label>
                        <input
                            type="password"
                            id="inpuTFirstname"
                            className="form-control password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                    <button className="btn btn-lg btn-success btn-block text-uppercase mt-4">
                        Add
                    </button>
                </form>
            </div>
        </Admin>
    );
};

export default withRouter(AddUser);
