import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from '../Dashboard/Dashboard';
import './add-product.css';

const AddItem = () => {
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [disable, setDisable] = useState(false);

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [categoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();
    const [image, setImages] = useState();

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`
            );
            setCategories(categoriesResponse.data.data);

            // const subCategoriesResponse = await axios.get(
            //     `${process.env.REACT_APP_API_URL}/api/sub-categories`
            // );
            // setSubCategories(subCategoriesResponse.data.data);
        };
        loadCategories();
    }, []);

    const onItemAdd = async (e) => {
        e.preventDefault();
        setDisable(true);

        try {
            
            const newItem = new FormData();
            newItem.append('image', image);
            newItem.append('name', name);
            newItem.append('description', description);
            newItem.append('price', parseInt(Math.abs(price)));
            newItem.append('subCategoryId', subCategoryId);

            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/products/new`,
                newItem,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('New Product has been added.');

            history.push('/retailer/dashboard');
        } catch (err) {
            setDisable(false);
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
            console.log(categoriesResponse.data.data);
            setSubCategories(categoriesResponse.data.data.subCategory);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <Dashboard>
            <div className="add-item-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-md-12 col-sm-12">
                            <form className=" col-md-4 offset-md-4  ">
                                <div className="form-group">
                                    <label
                                        for="formGroupExampleInput "
                                        className="form-title"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="form-control"
                                        id="itemName"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        for="exampleFormControlTextarea1 "
                                        className="form-title"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="itemDescription"
                                        rows="3"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label
                                        for="formGroupExampleInput2 "
                                        className="form-title"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="itemPrice"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            onCategoryChange(e, categoryId)
                                        }
                                    >
                                        <option
                                            selected="true"
                                            disabled="disabled"
                                        >
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
                                        onChange={(e) =>
                                            setSubCategoryId(e.target.value)
                                        }
                                    >
                                        <option
                                            selected="true"
                                            disabled="disabled"
                                        >
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
                                        for="exampleFormControlFile1 "
                                        className="form-title"
                                    >
                                        Images
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) =>
                                            setImages(e.target.files[0])
                                        }
                                        className="form-control-file"
                                        accept="image/*"
                                        // id="itemImage"
                                    />
                                </div>

                                <button
                                    disabled={disable}
                                    onClick={onItemAdd}
                                    type="button"
                                    id="btnAdd"
                                    className="btn edit col-md-12"
                                >
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default AddItem;
