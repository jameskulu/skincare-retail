import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import NoImage from '../../../../images/noimage.jpg';
import './orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const token = localStorage.getItem('auth-token');
            const orderedItems = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/orders`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setOrders(orderedItems.data.data);
        };
        loadOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        swal({
            title: 'Are you sure?',
            text: 'Once cancelled, you will not be able to see this order!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem('auth-token');
                    await axios.delete(
                        `${process.env.REACT_APP_API_URL}/api/users/orders/${orderId}/cancel`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const myOrderResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/users/orders`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const sortedMyOrderResponse =
                        myOrderResponse.data.data.reverse();
                    setOrders(sortedMyOrderResponse);
                    toast.error(`Your order has been cancelled.`);
                } catch (err) {
                    toast.error(`${err.response.data.message}`);
                }
            }
        });
    };

    return (
        <div className="order-container">
            <div className="above-div">
                    <h2>My Orders</h2>
                </div>
            <div className="main">
                {/* <section>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 cart-heading">
                            <div class="text-center">
                                <h4 class="text-light text-center cart-title">
                                    My Orders
                                </h4>
                            </div>
                        </div>
                    </div>
                </section> */}

                

                {orders.length > 0 ? (
                    <div className="table-responsive">
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th>Product</th>
                                    <th>Retailer</th>
                                    <th>Ordered Date</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
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
                                                        order.product
                                                            .imageURL === null
                                                            ? NoImage
                                                            : order.product
                                                                  .imageURL
                                                    }
                                                    alt=""
                                                />
                                            </Link>
                                        </td>
                                        <td>{order.product.name}</td>
                                        <td>
                                            {order.product.retailer.companyName}
                                        </td>
                                        <td>{order.orderedDate}</td>
                                        <td>Rs. {order.product.price}</td>
                                        <td>{order.quantity}</td>
                                        <td>Rs. {order.totalPrice}</td>
                                        <td>
                                            {(() => {
                                                if (
                                                    order.status === 'pending'
                                                ) {
                                                    return (
                                                        <span className="text-warning">
                                                            Pending
                                                        </span>
                                                    );
                                                }
                                                if (
                                                    order.status === 'approved'
                                                ) {
                                                    return (
                                                        <span className="text-success">
                                                            Approved
                                                        </span>
                                                    );
                                                }
                                                if (
                                                    order.status === 'refused'
                                                ) {
                                                    return (
                                                        <span className="text-danger">
                                                            Refused
                                                        </span>
                                                    );
                                                }
                                                if (
                                                    order.status === 'delivered'
                                                ) {
                                                    return (
                                                        <span className="text-success">
                                                            Delivered
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })()}
                                        </td>
                                        <td>
                                            {order.status === 'pending' ? (
                                                <button
                                                    onClick={() =>
                                                        cancelOrder(order.id)
                                                    }
                                                    class="btn btn-danger btn-sm"
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    title="This product cannot be canceled"
                                                    class="btn btn-secondary btn-sm"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-div">
                        <p>You have not ordered any products yet.</p>
                        <Link to="/">
                            <button className="btn">Back to home</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
