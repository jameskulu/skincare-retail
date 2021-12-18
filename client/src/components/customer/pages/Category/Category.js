import './category.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import NoImage from '../../../../images/noimage.jpg';

const Category = (props) => {
    const { categoryName } = props.match.params;
    const [categories, setCategories] = useState([]);

    const [items, setItems] = useState([]);
    let [filteredItems, setFilteredItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [subCategoryFilter, setSubCategoryFilter] = useState();

    const [priceSlider, setPriceSlider] = useState([0, 10000]);

    useEffect(() => {
        const displayItems = async () => {
            const itemResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories/products/${categoryName}`
            );
            setItems(itemResponse.data.data);
            setFilteredItems(itemResponse.data.data);

            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories/name/${categoryName}`
            );
            setSubCategories(categoriesResponse.data.data.subCategory);

            const token = localStorage.getItem('auth-token');
            const categoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            console.log(categoryRes);

            setCategories(categoryRes.data.data);
        };

        displayItems();
    }, [categoryName]);

    const onSubcategoryChange = (e) => {
        const value = e.target.value;
        setSubCategoryFilter(value);
        filteredItems = [...items];

        let filItems;

        filItems = filteredItems.filter(
            (item) =>
                item.subCategory.name === value &&
                item.price > priceSlider[0] &&
                item.price < priceSlider[1]
        );
        setFilteredItems(filItems);
    };

    const onSliderChange = (event, newValue) => {
        setPriceSlider(newValue);
        filteredItems = [...items];
        let filItems;

        if (subCategoryFilter === undefined) {
            filItems = filteredItems.filter(
                (item) => item.price > newValue[0] && item.price < newValue[1]
            );
        } else if (subCategoryFilter === undefined) {
            filItems = filteredItems.filter(
                (item) => item.price > newValue[0] && item.price < newValue[1]
            );
        } else {
            filItems = filteredItems.filter(
                (item) =>
                    item.price > newValue[0] &&
                    item.price < newValue[1] &&
                    item.subCategory.name === subCategoryFilter
            );
        }
        setFilteredItems(filItems);
    };

    const onRemoveFilter = () => {
        setSubCategoryFilter(undefined);
        setPriceSlider([0, 10000]);
        setFilteredItems(items);

        var ele = document.getElementsByName('subcategory');
        for (let i = 0; i < ele.length; i++) {
            ele[i].checked = false;
        }

        var ele2 = document.getElementsByName('color-filter');
        for (let i = 0; i < ele2.length; i++) {
            ele2[i].checked = false;
        }
    };

    return (
        <div className="category-container">
            <heading>{categoryName}</heading>
            <div className="main">
                <div className="row">
                    <div className="col-5 col-sm-3">
                        <h4 className="mt-4 mb-2">Category</h4>

                        {categories.map((category) => (
                            <p className="mt-3">
                                <Link to={`/category/${category.name}`}>
                                    {category.name}
                                </Link>
                            </p>
                        ))}

                        <h4 className="mt-4 mb-2">Filters</h4>

                        <Link
                            style={{ textDecoration: 'underline' }}
                            onClick={onRemoveFilter}
                        >
                            Remove filter
                        </Link>

                        {subCategories.map((sub) => (
                            <div className="select-item">
                                <input
                                    type="radio"
                                    name="subcategory"
                                    id={`sub-category-${sub.name}`}
                                    className="check-input"
                                    value={sub.name}
                                    onChange={(e) => onSubcategoryChange(e)}
                                />
                                <label for={`sub-category-${sub.name}`}>
                                    {sub.name}
                                </label>
                            </div>
                        ))}

                        <h4>Price (Rs)</h4>

                        <Slider
                            value={priceSlider}
                            onChange={onSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                            title="Choose price range"
                            aria-labelledby="range-slider"
                        />
                    </div>
                    <div className="col-sm-9 col-7">
                        <div className="row product-section">
                            {filteredItems.length > 0 ? (
                                <>
                                    {filteredItems.map((product) => (
                                        <div className="card">
                                            <Link
                                                to={`/products/${product.id}`}
                                            >
                                                <img
                                                    className="card-img-top"
                                                    src={
                                                        product.imageURL ===
                                                        null
                                                            ? NoImage
                                                            : product.imageURL
                                                    }
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="card-body">
                                                <Link
                                                    to={`/products/${product.id}`}
                                                >
                                                    <h5 className="card-title">
                                                        {product.name}
                                                    </h5>
                                                </Link>
                                                <p className="card-text">
                                                    {product.subCategory.name}
                                                </p>
                                                <h5 className="card-title">
                                                    Rs. {product.price} 
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
