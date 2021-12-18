import './orders.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';
import NoImage from '../../../../images/noimage.jpg';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            const token = localStorage.getItem('auth-token');
            const orderResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/retailers/orders`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setOrders(orderResponse.data.data);
        };
        getOrder();
    }, []);

    const changeStatus = async (value, orderId) => {
        swal({
            title: 'Are you sure want to update the status?',
            icon: 'warning',
            buttons: true,
            dangerMode: false,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem('auth-token');
                    await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/retailers/orders/${orderId}/status`,
                        { status: value },
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const orderedItems = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/retailers/orders`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    setOrders(orderedItems.data.data);
                    toast.success('Status changed.');
                } catch (err) {
                    toast.error('Something went wrong.');
                }
            }
        });
    };

    return (
        <Dashboard>
            <div className="rent-orders-container">
                <h2 className="mb-4">Orders</h2>
                <div className="table-responsive">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Products</th>
                                <th scope="col">Ordered Date</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                                <th scope="col">Customer</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr>
                                    <td>
                                        <Link
                                            to={`/products/${order.product.id}`}
                                        >
                                            <img
                                                class="img-fluid img-thumbnail"
                                                src={
                                                    order.product.imageURL ===
                                                    null
                                                        ? NoImage
                                                        : order.product.imageURL
                                                }
                                                alt=""
                                            />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/products/${order.product.id}`}
                                        >
                                            <p class="text-uppercase">
                                                {order.product.name}
                                            </p>
                                        </Link>
                                    </td>
                                    <td>{order.orderedDate}</td>
                                    <td>{order.quantity}</td>
                                    <td>Rs. {order.product.price}</td>

                                    <td id="price">Rs. {order.totalPrice}</td>
                                    <td>
                                        <select
                                            className="form-control form-control-sm"
                                            value={order.status}
                                            onChange={(e) =>
                                                changeStatus(
                                                    e.target.value,
                                                    order.id
                                                )
                                            }
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="approved">
                                                Approved
                                            </option>
                                            <option value="refused">
                                                Refused
                                            </option>
                                            <option value="delivered">
                                                Delivered
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <p>
                                            {order.user.firstName}{' '}
                                            {order.user.lastName}
                                        </p>
                                        <p>{order.phoneNumber}</p>
                                        <p>
                                            {order.address},{order.city}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Dashboard>
    );
};

export default Orders;
