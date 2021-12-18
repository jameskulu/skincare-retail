import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';
import { withRouter } from 'react-router-dom';
import User from '../../../images/user.png';

const RetailerAdmin = () => {
    const [retailers, setRetailers] = useState([]);
    const [deleted, setDeleted] = useState([]);

    useEffect(() => {
        const loadRetailers = async () => {
            const token = localStorage.getItem('auth-token');
            const retailersRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setRetailers(retailersRes.data.data);
            
        };

        loadRetailers();
    }, [deleted]);

    const onRetailerDelete = async (id) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers/delete/${id}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Retailer is deleted.');
            setDeleted((prevValue) => !prevValue);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return (
        <Admin>
            <div class="card mb-3">
                <div class="card-header">
                    <i class="fas fa-table"></i>Retailers Table
                </div>
                <div class="card-body">
                    <Link to="/admin/retailers/add">
                        <button className="btn btn-success mb-4">
                            Add Retailer
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
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {retailers.map((retailer) => {
                                    return (
                                        <tr>
                                            <td><img width="70" src={retailer.profilePicURL || User } alt="" /></td>
                                            <td>{retailer.companyName}</td>
                                            <td>{retailer.email}</td>
                                            <td>{retailer.location}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/retailers/edit/${retailer.id}`}
                                                    className="text-primary"
                                                >
                                                    Update{' '}
                                                </Link>
                                                <Link
                                                    className="text-danger"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Are you sure want to delete this retailer ?'
                                                            )
                                                        ) {
                                                            onRetailerDelete(
                                                                retailer.id
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

export default withRouter(RetailerAdmin);
