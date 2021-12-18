import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li>
                                <Link to="/about-us">about us</Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals">New Arrivals</Link>
                            </li>
                            {/* <li>
                                <a href="#">privacy policy</a>
                            </li>
                            <li>
                                <a href="#">affiliate program</a>
                            </li> */}
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>get help</h4>
                        <ul>
                          
                            <li>
                                <Link to="/cart">My Cart</Link>
                            </li>
                            <li>
                                <Link to="/wishlist">My Wishlist</Link>
                            </li>
                            <li>
                                <Link to="/orders">Order</Link>
                            </li>
                          
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Categories</h4>
                        <ul>
                            <li>
                                <Link to="/category/Skin Care">Skin Care</Link>
                            </li>
                            <li>
                                <Link to="/category/Eye Care">Eye Care</Link>
                            </li>
                            <li>
                                <Link to="/category/Lip Care">Lip Care</Link>
                            </li>
                            <li>
                                <Link to="/category/Body Care">Body Care</Link>
                            </li>
                            <li>
                                <Link to="/category/Skin Concerns">Skin Concerns</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <a href="https://www.facebook.com/" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
