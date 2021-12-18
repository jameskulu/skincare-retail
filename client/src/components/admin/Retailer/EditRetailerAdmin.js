import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const EditUser = (props) => {
    const history = useHistory();

    const retailerId = props.match.params.retailerId

    const [companyName, setCompanyName] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const loadSingleUser = async () => {
            const token = localStorage.getItem('auth-token');
            const singleUserRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers/${retailerId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            setCompanyName(singleUserRes.data.data.companyName);
            setLocation(singleUserRes.data.data.location);
            setEmail(singleUserRes.data.data.email);
            setImage(singleUserRes.data.data.profilePicURL);
        };
        loadSingleUser();
    }, []);

    const onUserAdd = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = new FormData();
            updatedUser.append('image', image);
            updatedUser.append('companyName', companyName);
            updatedUser.append('location', location);
            updatedUser.append('email', email);

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers/update/${retailerId}`,
                updatedUser,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('User has been updated.');
            history.push('/admin/retailers');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Edit Retailer</h3>
                <form className="mt-4" action="" onSubmit={onUserAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Company Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={location}
                            required
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Email</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
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
                        Update
                    </button>
                </form>
            </div>
        </Admin>
    );
};

export default withRouter(EditUser)
