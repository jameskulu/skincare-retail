import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';
import { withRouter } from 'react-router-dom';
import User from '../../../images/user.png';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [deleted, setDeleted] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const token = localStorage.getItem('auth-token');
            const usersRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/users`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setUsers(usersRes.data.data);
            
        };

        loadUsers();
    }, [deleted]);

    const onUserDelete = async (id) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/users/delete/${id}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('User is deleted.');
            setDeleted((prevValue) => !prevValue);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return (
        <Admin>
            <div class="card mb-3">
                <div class="card-header">
                    <i class="fas fa-table"></i>Users Table
                </div>
                <div class="card-body">
                    <Link to="/admin/users/add">
                        <button className="btn btn-success mb-4">
                            Add User
                        </button>
                    </Link>
                    <div class="table-responsive">
                        <table
                            class="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellspacing="0"
                        >
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr>
                                            <td><img width="70" src={user.profilePicURL || User } alt="" /></td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                {user.gender === 'ma'
                                                    ? 'Male'
                                                    : 'Female'}
                                            </td>
                                            <td>{user.address}</td>
                                            <td>{user.city}</td>
                                            <td>{user.country}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/users/edit/${user.id}`}
                                                    className="text-primary"
                                                >
                                                    Update{' '}
                                                </Link>
                                                <Link
                                                    className="text-danger"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Are you sure want to delete this user ?'
                                                            )
                                                        ) {
                                                            onUserDelete(
                                                                user.id
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {' '}
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    );
};

export default withRouter(UserAdmin);
