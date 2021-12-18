import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const AddUser = () => {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState('ma');
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [role, setRole] = useState();
    const [image, setImage] = useState();

    const onUserAdd = async (e) => {
        e.preventDefault();
        try {
            const newUser = new FormData();
            newUser.append('image', image);
            newUser.append('firstName', firstName);
            newUser.append('lastName', lastName);
            newUser.append('email', email);
            newUser.append('password', password);
            newUser.append('gender', gender);
            newUser.append('address', address);
            newUser.append('city', city);
            newUser.append('country', country);
            newUser.append('role', role);

            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/users/new`,
                newUser,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('New user has been added.');

            history.push('/admin/users');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Add User</h3>
                <form className="mt-4" action="" onSubmit={onUserAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">First Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control fname"
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
                            className="form-control lname"
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

                    <div class="form-group">
                        <label for="Phone Number">Gender</label>
                        <select
                            class="form-control gender"
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
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
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
                            onClick={(e) => setRole(e.target.value)}
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
