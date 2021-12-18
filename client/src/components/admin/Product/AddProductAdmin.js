import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const AddProductAdmin = () => {
    const history = useHistory();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [retailersArr, setRetailersArr] = useState([]);

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [categoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();
    const [retailerId, setRetailerId] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`
            );
            setCategories(categoriesResponse.data.data);

            const token = localStorage.getItem('auth-token');

            const retailersRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/retailers`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setRetailersArr(retailersRes.data.data);
        };
        loadCategories();
    }, []);

    const onItemAdd = async (e) => {
        e.preventDefault();

        try {
            const newItem = new FormData();
            newItem.append('name', name);
            newItem.append('description', description);
            newItem.append('price', parseInt(Math.abs(price)));
            newItem.append('subCategoryId', subCategoryId);
            newItem.append('retailerId', retailerId);
            newItem.append('image', image);

            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/products/new`,
                newItem,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('New product has been added.');
            history.push('/admin/products');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const onCategoryChange = async (e) => {
        const id = e.target.value;
        setCategoryId(id);
        try {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories/${id}`
            );
            setSubCategories(categoriesResponse.data.data.subCategory);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };
    return (
        <Admin>
            <div style={{ padding: '20px 40px' }}>
                <h3>Add Item</h3>
                <form className="mt-4" action="" onSubmit={onItemAdd}>
                    <div className="form-group">
                        <label htmlFor="inpuTFirstname">Name</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control name"
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
                        <label htmlFor="inpuTFirstname">Price</label>
                        <input
                            type="text"
                            id="inpuTFirstname"
                            className="form-control price"
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label
                            for="exampleFormControlSelect1 "
                            className="form-title"
                        >
                            Category
                        </label>
                        <select
                            className="form-control"
                            id="itemCategory"
                            value={categoryId}
                            onChange={(e) => onCategoryChange(e, categoryId)}
                        >
                            <option selected="true" disabled="disabled">
                                -- select a category --
                            </option>
                            {categories.map((category) => {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label
                            for="exampleFormControlSelect1 "
                            className="form-title"
                        >
                            Sub Category
                        </label>
                        <select
                            className="form-control"
                            id="itemSubcategory"
                            value={subCategoryId}
                            onChange={(e) => setSubCategoryId(e.target.value)}
                        >
                            <option selected="true" disabled="disabled">
                                -- select a sub category --
                            </option>
                            {subCategories.map((subCategory) => {
                                return (
                                    <option
                                        key={subCategory.id}
                                        value={subCategory.id}
                                    >
                                        {subCategory.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label
                            for="exampleFormControlSelect1 "
                            className="form-title"
                        >
                            Retailer
                        </label>
                        <select
                            className="form-control"
                            id="itemSubcategory"
                            value={subCategoryId}
                            onChange={(e) => setRetailerId(e.target.value)}
                        >
                            <option selected="true">
                                -- select a retailer --
                            </option>
                            {retailersArr.map((retailer) => {
                                return (
                                    <option
                                        key={retailer.id}
                                        value={retailer.id}
                                    >
                                        {retailer.companyName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label
                            for="exampleFormControlFile1 "
                            className="form-title"
                        >
                            Images
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
                        Add
                    </button>
                </form>
            </div>
        </Admin>
    );
};

export default withRouter(AddProductAdmin);
