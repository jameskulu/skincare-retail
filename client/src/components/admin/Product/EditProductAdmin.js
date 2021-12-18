import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const EditProductAdmin = (props) => {
    const history = useHistory();

    const productId = props.match.params.productId;

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const loadSingleItem = async () => {
            const token = localStorage.getItem('auth-token');
            const singleItemRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/products/${productId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            setName(singleItemRes.data.data.name);
            setDescription(singleItemRes.data.data.description);
            setPrice(singleItemRes.data.data.price);
            setImage(singleItemRes.data.data.imageURL);
        };
        loadSingleItem();
    }, []);

    const onItemUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedItem = new FormData();
            updatedItem.append('name', name);
            updatedItem.append('description', description);
            updatedItem.append('price', parseInt(Math.abs(price)));
            updatedItem.append('image', image);

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/products/update/${productId}`,
                updatedItem,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Product has been updated.');
            history.push('/admin/products');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Edit Item</h3>
                <form className="mt-4" action="" onSubmit={onItemUpdate}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Description</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="text"
                            className="form-control price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label
                            for="exampleFormControlFile1 "
                            className="form-title"
                        >
                            Image
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control-file"
                            accept="image/*"
                            // id="itemImage"
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

export default withRouter(EditProductAdmin);
