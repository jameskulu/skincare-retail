import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './home2.css';
import Product from './Product';
import Banner from '../../../../images/banner.png';
import { Link } from 'react-router-dom';
import NoImage from '../../../../images/noimage.jpg';
import SkinCare from '../../../../images/skincare.png';
import SkinConcern from '../../../../images/skinconcern.jpg';
import EyeCare from '../../../../images/eyecare.png';
import LipCare from '../../../../images/lipcare.png';
import BodyCare from '../../../../images/bodycare.png';
import Customer1 from '../../../../images/customer1.jpg';
import Customer2 from '../../../../images/customer2.jpg';
import Customer3 from '../../../../images/customer3.jpg';

const Home2 = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/`
            );
            const categoryResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories/`
            );
            setLatestProducts(productResponse.data.data);
            setCategories(categoryResponse.data.data);
        };
        loadProducts();
    }, []);

    return (
        <div className="homepage main">
            <div className="hero-section">
             
                <Link to={`/category/Skin Care`}>
                                   <button>SHOP NOW</button></Link> 
            </div>

            <div className="outer-latest-released">
                <h3>New Arrivals</h3>
                <div className="latest-released">
                    <Product products={latestProducts} />
                </div>
            </div>

            <div className="banner">
                <div className="left-banner">
                    <img src={Banner} alt="" />
                </div>
                <div className="right-banner">
                    <h3>Great skin is better than filters.</h3>
                    <p>Men do take care of their skin.</p>
                    <Link to={`/category/Skin Care`}>
                                   <button>SHOP NOW</button></Link>
                </div>
            </div>

            <div className="outer-latest-released">
                <h3>Shop by Categories</h3>
                <div className="latest-released">
                    {/* {categories.map((product) => (
                        <div
                            key={product.id}
                            className="single-latest-released"
                        >
                            <Link to={`/category/${product.name}`}>
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
                                <h4 style={{ textAlign: 'center' }}>
                                    <Link to={`/category/${product.name}`}>
                                        {product.name}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    ))} */}

                    <div className="single-latest-released">
                        <Link to={`/category/Skin Concerns`}>
                            <img src={SkinConcern} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Skin Concerns`}>
                                    Skin Concerns
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Skin Care`}>
                            <img src={SkinCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Skin Care`}>
                                    Skin Care
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Body Care`}>
                            <img src={BodyCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Body Care`}>
                                    Body Care
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Lip Care`}>
                            <img src={LipCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Lip Care`}>Lip Care</Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Eye Care`}>
                            <img src={EyeCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Eye Care`}>Eye Care</Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Testimonials --> */}
            <div className="testomonial">
                {/* <p>Our customer stories</p> */}
                <h2>Testimonials</h2>
                <div class="inner-testomonial">
                    <div class="single-testomonial">
                        <img src={Customer1} alt="" />
                        <h3>Rina Dahal</h3>
                        <span>Skin enthusiast</span>
                        <p>
                            "Excellent service. The products were wrapped securely
                            and arrived in pristine condition. I sent an email
                            after to products arrived to ask about the products, and
                            I received a prompt reply."
                        </p>
                    </div>
                    <div class="single-testomonial">
                        <img src={Customer2} alt="" />
                        <h3>Dean Hale</h3>
                        <span>Writer</span>
                        <p>
                            "Products went above and beyond, even for men - great and friendly
                            customer service and free prompt delivery of my
                            products. I highly recommend them. Many thanks!"
                        </p>
                    </div>
                    <div class="single-testomonial">
                        <img src={Customer3} alt="" />
                        <h3>Rose Shah</h3>
                        <span>Student</span>
                        <p>
                            "Something for every skin concern! Great selection and
                            even better prices! I will definitely be re-ordering
                            from skin care again in the future!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home2;
