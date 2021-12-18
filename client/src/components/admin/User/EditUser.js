import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const EditUser = (props) => {
    const history = useHistory();

    const userId = props.match.params.userId

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState('ma');
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [role, setRole] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const loadSingleUser = async () => {
            const token = localStorage.getItem('auth-token');
            const singleUserRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            setFirstName(singleUserRes.data.data.firstName);
            setLastName(singleUserRes.data.data.lastName);
            setEmail(singleUserRes.data.data.email);
            setAddress(singleUserRes.data.data.address);
            setGender(singleUserRes.data.data.gender);
            setCity(singleUserRes.data.data.city);
            setCountry(singleUserRes.data.data.country);
            setRole(singleUserRes.data.data.role);
            setImage(singleUserRes.data.data.profilePicURL);
        };
        loadSingleUser();
    }, []);

    const onUserAdd = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = new FormData();
            updatedUser.append('image', image);
            updatedUser.append('firstName', firstName);
            updatedUser.append('lastName', lastName);
            updatedUser.append('email', email);
            updatedUser.append('gender', gender);
            updatedUser.append('address', address);
            updatedUser.append('city', city);
            updatedUser.append('country', country);
            updatedUser.append('role', role);

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/users/update/${userId}`,
                updatedUser,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('User has been updated.');
            history.push('/admin/users');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Edit User</h3>
                <form className="mt-4" action="" onSubmit={onUserAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">First Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Last Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={lastName}
                            required
                            onChange={(e) => setLastName(e.target.value)}
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

                    <div class="form-group">
                        <label for="Phone Number">Gender</label>
                        <select
                            class="form-control"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        >
                            <option value="ma">Male</option>
                            <option value="fe">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            className="form-control city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            className="form-control country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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

                    <div>
                        <p className="mb-2">Role</p>
                    </div>

                    <div>
                        <label htmlFor="user">User</label>
                        <input
                            className="ml-2"
                            type="radio"
                            id="user"
                            name="Role"
                            value="user"
                            checked={role === 'user' ? true : false}
                            onClick={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="admin">Admin</label>
                        <input
                            className="ml-2"
                            type="radio"
                            id="admin"
                            name="Role"
                            value="admin"
                            checked={role === 'admin' ? true : false}
                            onClick={(e) => setRole(e.target.value)}
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
