import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';
import axios from 'axios';
import NoImage from '../../../images/noimage.jpg';

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [deleted, setDeleted] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            const token = localStorage.getItem('auth-token');
            const itemRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/products`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setProducts(itemRes.data.data);
        };

        loadItems();
    }, [deleted]);

    const onItemDelete = async (id) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/products/delete/${id}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Product has been deleted.');
            setDeleted((prevValue) => !prevValue);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return (
        <Admin>
            <div class="card mb-3">
                <div class="card-header">
                    <i class="fas fa-table"></i>Products Table
                </div>
                <div class="card-body">
                    <Link to="/admin/products/add">
                        <button className="btn btn-success mb-4">
                            Add Item
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
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Retailer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => {
                                    return (
                                        <tr>
                                            <td>
                                                <img
                                                    width="70"
                                                    src={
                                                        product
                                                            .imageURL === null
                                                            ? NoImage
                                                            : product
                                                                  .imageURL
                                                    }
                                                    alt=""
                                                />
                                            </td>
                                            <td>{product.name} </td>
                                            <td>{product.description}</td>
                                            <td>Rs. {product.price}</td>
                                            <td>
                                                {product.retailer.companyName}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="text-primary"
                                                >
                                                    Update{' '}
                                                </Link>
                                                <Link
                                                    className="text-danger"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Are you sure want to delete this product ?'
                                                            )
                                                        ) {
                                                            onItemDelete(
                                                                product.id
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

export default withRouter(ProductAdmin);
