import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import Dashboard from '../Dashboard/Dashboard';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import NoImage from '../../../../images/noimage.jpg';

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const displayItems = async () => {
            const token = localStorage.getItem('auth-token');
            const itemResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/retailers/products`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setProducts(itemResponse.data.data);
        };
        displayItems();
    }, []);

    const onItemDelete = async (productId) => {
        swal({
            title: 'Are you sure want to delete this product?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem('auth-token');

                    await axios.delete(
                        `${process.env.REACT_APP_API_URL}/api/retailers/products/delete/${productId}`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );

                    const itemResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/retailers/products`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    setProducts(itemResponse.data.data);

                    toast.success('Product has been deleted.');
                } catch (err) {
                    toast.error(err.response.data.message);
                }
            }
        });
    };

    return (
        <Dashboard>
            <div className="view-items-container">
                <h2 className='mb-4'>Products</h2>
                {products.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Products</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th colspan="2" scope="col">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr>
                                        <td>
                                            <Link to={`/products/${product.id}`}>
                                                <img
                                                    class="img-fluid img-thumbnail"
                                                    src={
                                                        product
                                                            .imageURL === null
                                                            ? NoImage
                                                            : product
                                                                  .imageURL
                                                    }
                                                    alt=""
                                                />
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/products/${product.id}`}>
                                                <p style={{ fontSize: '20px' }}>
                                                    {product.name}
                                                </p>
                                            </Link>
                                            <p style={{ fontWeight: 'normal' }}>
                                                Rs. {product.price}
                                            </p>
                                        </td>
                                        <td></td>
                                        <td></td>

                                        <td id="iconedit">
                                            <Link
                                                to={`/retailer/products/edit/${product.id}`}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                        </td>
                                        <td id="icondel">
                                            <i
                                                onClick={() => {
                                                    onItemDelete(product.id);
                                                }}
                                                className="fas fa-trash-alt"
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-div">
                        <p>You have not uploaded any products.</p>
                        <Link to="/retailer/add-product">
                            <button className="btn">Add an Item</button>
                        </Link>
                    </div>
                )}
            </div>
        </Dashboard>
    );
};

export default Product;
