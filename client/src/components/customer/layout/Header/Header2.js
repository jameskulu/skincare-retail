import React, { useContext, useState, useEffect } from 'react';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../../context/UserContext';
import CartContext from '../../../../context/CartContext';
import Logo from '../../../../images/logo.png';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header2 = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { cartData } = useContext(CartContext);
    const history = useHistory();
    const toggleMenu = () => {
        document.getElementById('navbar').classList.toggle('toggle');
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategory = async () => {
            const token = localStorage.getItem('auth-token');
            const categoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            setCategories(categoryRes.data.data);
        };

        loadCategory();
    }, []);

    const logout = () => {
        swal({
            title: 'Are you sure want to logout?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                setUserData({
                    token: undefined,
                    user: undefined,
                });
                localStorage.setItem('auth-token', '');
                history.push('/');
                toast.success('You are logged out successfully.');
            }
        });
    };

    return (
        <header>
            <div className="inner-header">
                <Link to="/">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                </Link>

                <nav>
                    <i
                        onClick={toggleMenu}
                        id="toggle-button"
                        className="fas fa-bars"
                    ></i>
                    <ul id="navbar">
                        <li>
                            <Link className="nav-item-link active" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="nav-item-link active"
                                to="/about-us"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="nav-item-link active"
                                to="/new-arrivals"
                            >
                                New Arrivals
                            </Link>
                        </li>

                        <li className="dropdown">
                            <Link
                                className="nav-item-link "
                                to="#"
                                id="navbarDropdown3"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Category
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown3"
                            >
                                {categories.map((category) => (
                                    <Link
                                        className="dropdown-item"
                                        to={`/category/${category.name}`}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </li>

                        {userData.user ? (
                            userData.user.role === 'admin' ? (
                                <li>
                                    <Link
                                        className="nav-item-link active"
                                        to="/admin"
                                    >
                                        Admin
                                    </Link>
                                </li>
                            ) : null
                        ) : null}

                        <li>
                            <Link to="/wishlist" className="nav-item-link">
                                <i class="far fa-heart"></i>
                            </Link>
                        </li>

                        <li>
                            <Link to="/cart" className="nav-item-link">
                                <i className="fas fa-shopping-cart"></i>
                                {cartData > 0 ? (
                                    <span class="badge badge-danger">
                                        {cartData}
                                    </span>
                                ) : null}
                            </Link>
                        </li>

                        <li>
                            <Link to="/search" className="nav-item-link">
                                <i className="fas fa-search"></i>
                            </Link>
                        </li>

                        {userData.user_type === 'user' ? (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-item-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown2"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Hi, {userData.user.firstName}
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown2"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to="/profile"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/orders"
                                    >
                                        My Orders
                                    </Link>

                                    {/* <Link
                                        className="dropdown-item"
                                        to="/change-password"
                                    >
                                        Change Password
                                    </Link> */}
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        onClick={() => {
                                            logout();
                                        }}
                                        className="dropdown-item "
                                        style={{ color: 'red' }}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        ) : null}

                        {userData.user_type === 'retailer' ? (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-item-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown2"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Hi, {userData.user.companyName}
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown2"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to="/retailer/dashboard"
                                    >
                                        Go to retailer dashboard
                                    </Link>
                                <div className="dropdown-divider"></div>
                                    <Link
                                        onClick={() => {
                                            logout();
                                        }}
                                        className="dropdown-item "
                                        style={{ color: 'red' }}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        ) : null}

                        {userData.user_type !== undefined ? null : (
                            <li>
                                <Link to="/auth">
                                    <button>Login</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header2;
