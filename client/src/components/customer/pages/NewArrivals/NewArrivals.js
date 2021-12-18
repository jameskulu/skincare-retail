import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Home/home2.css';
import Product from '../Home/Product';

const NewArrivals = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products`
            );
            setLatestProducts(productResponse.data.data);
        };
        loadProducts();
    }, []);
    return (
        <>
            <div className="above-div">
                <h2>New Arrivals</h2>
            </div>
            <div className="main">
                <div className="outer-latest-released">
                    <div className="latest-released">
                        <Product products={latestProducts} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewArrivals;
