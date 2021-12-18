import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from '../Dashboard/Dashboard';
import '../AddProduct/add-product.css';

const EditItem = (props) => {
    const history = useHistory();
    const productId = props.match.params.productId;
    const [disable, setDisable] = useState(false);

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const loadSingleItem = async () => {
            const singleItemResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/${productId}`
            );
            setName(singleItemResponse.data.data.name);
            setDescription(singleItemResponse.data.data.description);
            setPrice(singleItemResponse.data.data.price);
            setImage(singleItemResponse.data.data.imageURL);
        };

        loadSingleItem();
    }, []);

    const onItemUpdate = async (e) => {
        e.preventDefault();
        setDisable(true);

        try {
            const updateItem = new FormData();
            updateItem.append('image', image);
            updateItem.append('name', name);
            updateItem.append('description', description);
            updateItem.append('price', parseInt(Math.abs(price)));

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/retailers/products/update/${productId}`,
                updateItem,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Product updated');
            history.push('/retailer/dashboard');
        } catch (err) {
            setDisable(false);
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
                                        id="etName"
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
                                        id="etDescription"
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
                                        id="etPrice"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
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
                                            setImage(e.target.files[0])
                                        }
                                        className="form-control-file"
                                        accept="image/*"
                                        // id="itemImage"
                                    />
                                </div>

                                <button
                                    disabled={disable}
                                    onClick={onItemUpdate}
                                    type="button"
                                    id="btnUpdateItem"
                                    className="btn edit col-md-12"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default EditItem;
