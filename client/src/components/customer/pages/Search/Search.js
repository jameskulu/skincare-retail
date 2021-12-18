import axios from 'axios';
import React, { useState } from 'react';
import Product from '../Home/Product';
import './search.css';

const SearchPage = () => {
    const [searchedItems, setSearchedItems] = useState([]);
    const [search, setSearch] = useState([]);

    const onSearch = async (e) => {
        setSearch(e.target.value);

        if (e.target.value !== '') {
            const searchedItemsResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/s?q=${search}`
            );
            setSearchedItems(searchedItemsResponse.data.data);
        } else {
            const itemsResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products`
            );
            setSearchedItems(itemsResponse.data.data);
        }
    };

    return (
        <div className="container search mt-4">
            <input
                type="text"
                placeholder="Search for items..."
                onChange={onSearch}
                value={search}
            />

            <div className="outer-latest-released">
                <div className="latest-released">
                    <Product products={searchedItems} />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
