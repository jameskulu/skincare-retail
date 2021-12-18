import React from 'react';
import { Link } from 'react-router-dom';
import NoImage from '../../../../images/noimage.jpg';

const Product = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <div key={product.id} className="single-latest-released">
                    <Link to={`/products/${product.id}`}>
                        <img
                            src={
                                product.imageURL === null
                                    ? NoImage
                                    : product.imageURL
                            }
                            alt=""
                        />
                    </Link>
                    <div className="movie-info">
                        <h4>
                            <Link to={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </h4>
                        <i className="fas fa-tag"></i>
                        <span>{product.subCategory.name}</span>
                        <h6>Rs. {product.price}</h6>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Product;
