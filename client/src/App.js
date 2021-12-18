import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import UserContext from './context/UserContext';
import CartContext from './context/CartContext';
import Header from './components/customer/layout/Header/Header2';
import Footer from './components/customer/layout/Footer/Footer';

import './App.css';
import Auth from './components/Auth';


// User
import Home from './components/customer/pages/Home/Home';
import AboutUs from './components/customer/pages/AboutUs/AboutUs';
import NewArrivals from './components/customer/pages/NewArrivals/NewArrivals';
import Signup from './components/customer/auth/Signup';
import Login from './components/customer/auth/Login';
import CustomerVerifyEmail from './components/customer/auth/VerifyEmail';
import CustomerForgotPassword from './components/customer/auth/ForgotPassword';
import CustomerResetPassword from './components/customer/auth/ResetPassword';
import ProductDetail from './components/customer/pages/ProductDetail/ProductDetail';
import Cart from './components/customer/pages/Cart/Cart';
import Checkout from './components/customer/pages/Checkout/Checkout';
import MyOrders from './components/customer/pages/Orders/Orders';
import Profile from './components/customer/pages/Profile/Profile';
import EditProfile from './components/customer/pages/EditProfile/EditProfile';
import ChangePassword from './components/customer/pages/ChangePassword/ChangePassword';
import Wishlist from './components/customer/pages/Wishlist/Wishlist';
import Search from './components/customer/pages/Search/Search';
import Category from './components/customer/pages/Category/Category';

// Retailers
import RetailerSignup from './components/retailer/auth/Signup';
import RetailerLogin from './components/retailer/auth/Login';
import RetailerVerifyEmail from './components/retailer/auth/VerifyEmail';
import RetailerForgotPassword from './components/retailer/auth/ForgotPassword';
import RetailerResetPassword from './components/retailer/auth/ResetPassword';
// import Dashboard from './components/retailer/pages/Dashboard/Dashboard';
import Product from './components/retailer/pages/Product/Product';
import AddProduct from './components/retailer/pages/AddProduct/AddProduct';
import EditProduct from './components/retailer/pages/EditProduct/EditProduct';
import RetailerOrders from './components/retailer/pages/Orders/Orders';

// Middleware
import RetailerProtectedRoute from './middlewares/retailerProtectedRoutes';

import Admin from './components/admin/Admin';

import ProtectedAdminRoute from './middlewares/protectedAdminRoute';
import UserAdmin from './components/admin/User/User';
import AddUser from './components/admin/User/AddUser';
import EditUser from './components/admin/User/EditUser';
import RetailerAdmin from './components/admin/Retailer/RetailerAdmin';
import AddRetailerAdmin from './components/admin/Retailer/AddRetailerAdmin';
import EditRetailerAdmin from './components/admin/Retailer/EditRetailerAdmin';
import ProductAdmin from './components/admin/Product/ProductAdmin';
import AddProductAdmin from './components/admin/Product/AddProductAdmin';
import EditProductAdmin from './components/admin/Product/EditProductAdmin';
import AdminCategory from './components/admin/Category/AdminCategory';
import AddCategoryAdmin from './components/admin/Category/AddCategoryAdmin';
import EditCategoryAdmin from './components/admin/Category/EditCategoryAdmin';
import SubCategory from './components/admin/SubCategory/SubCategory';
import AddSubCategory from './components/admin/SubCategory/AddSubCategory';
import EditSubCategory from './components/admin/SubCategory/EditSubCategory';
import ScrollToTop from './ScrollToTop';

import { useEffect, useState } from 'react';
import axios from 'axios';

toast.configure();
function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
        user_type: undefined,
    });

    const [cartData, setCartData] = useState(0);

    const isRetailerAuth = () => {
        if (userData.user_type !== undefined) {
            if (userData.user_type === 'retailer') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const userTokenResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/tokenIsValid`,
                null,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            const retailerTokenResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/tokenIsValid`,
                null,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            if (userTokenResponse.data) {
                const userResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/users`,
                    { headers: { Authorization: 'Bearer ' + token } }
                );
                setUserData({
                    token,
                    user: userResponse.data,
                    user_type: 'user',
                });
            }

            if (retailerTokenResponse.data) {
                const retailerResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/retailers`,
                    { headers: { Authorization: 'Bearer ' + token } }
                );
                setUserData({
                    token,
                    user: retailerResponse.data,
                    user_type: 'retailer',
                });
            }

            // isRetailerAuth();
        };

        const cart = async () => {
            let cartNumber = JSON.parse(localStorage.getItem('cart'))
                ? JSON.parse(localStorage.getItem('cart')).length
                : 0;
            setCartData(cartNumber);
        };

        cart();

        checkLoggedIn();
    }, []);

    const isAdmin = () => {
        return true;
    };

    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop>
                    <UserContext.Provider value={{ userData, setUserData }}>
                        <CartContext.Provider value={{ cartData, setCartData }}>
                            {/* {userData.user_type === 'retailer' ? null : <Header />} */}

                            <Route
                                exact
                                path={[
                                    '/auth',
                                    '/',
                                    '/about-us',
                                    '/new-arrivals',
                                    '/customer/login',
                                    '/customer/signup',
                                    '/customer/verify-email/:token',
                                    '/customer/forgot-password',
                                    '/customer/reset-password/:token',
                                    '/retailer/login',
                                    '/retailer/signup',
                                    '/retailer/verify-email/:token',
                                    '/retailer/forgot-password',
                                    '/retailer/reset-password/:token',
                                    '/products/:productId',
                                    '/cart',
                                    '/checkout',
                                    '/checkout/complete',
                                    '/orders',
                                    '/profile',
                                    '/profile/edit',
                                    '/profile/change-password',
                                    '/wishlist',
                                    '/search',
                                    '/category/:categoryName',
                                ]}
                                component={Header}
                            />

                            {/* <main> */}
                                <Route exact path="/auth" component={Auth} />
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about-us" component={AboutUs} />
                                <Route exact path="/new-arrivals" component={NewArrivals} />
                                <Route
                                    exact
                                    path="/customer/login"
                                    component={Login}
                                />
                                <Route
                                    exact
                                    path="/customer/signup"
                                    component={Signup}
                                />
                                <Route
                                    exact
                                    path="/customer/verify-email/:token"
                                    component={CustomerVerifyEmail}
                                />
                                <Route
                                    exact
                                    path="/customer/forgot-password"
                                    component={CustomerForgotPassword}
                                />
                                <Route
                                    exact
                                    path="/customer/reset-password/:token"
                                    component={CustomerResetPassword}
                                />
                                <Route
                                    exact
                                    path="/products/:productId"
                                    component={ProductDetail}
                                />
                                <Route exact path="/cart" component={Cart} />
                                <Route
                                    exact
                                    path="/checkout"
                                    component={Checkout}
                                />
                                
                                <Route
                                    exact
                                    path="/orders"
                                    component={MyOrders}
                                />
                                <Route
                                    exact
                                    path="/profile"
                                    component={Profile}
                                />
                                <Route
                                    exact
                                    path="/profile/edit"
                                    component={EditProfile}
                                />
                                <Route
                                    exact
                                    path="/profile/change-password"
                                    component={ChangePassword}
                                />
                                <Route
                                    exact
                                    path="/wishlist"
                                    component={Wishlist}
                                />
                                <Route
                                    exact
                                    path="/search"
                                    component={Search}
                                />
                                <Route
                                    exact
                                    path="/category/:categoryName"
                                    component={Category}
                                />

                                {/* Retailers */}

                                <Route
                                    exact
                                    path="/retailer/login"
                                    component={RetailerLogin}
                                />
                                <Route
                                    exact
                                    path="/retailer/signup"
                                    component={RetailerSignup}
                                />
                                <Route
                                    exact
                                    path="/retailer/verify-email/:token"
                                    component={RetailerVerifyEmail}
                                />
                                <Route
                                    exact
                                    path="/retailer/forgot-password"
                                    component={RetailerForgotPassword}
                                />
                                <Route
                                    exact
                                    path="/retailer/reset-password/:token"
                                    component={RetailerResetPassword}
                                />
                            {/* </main> */}

                            {/* Retailers */}

                            <Route
                                exact
                                path="/retailer/dashboard"
                                component={Product}
                            />

                            <Route
                                exact
                                path="/retailer/add-product"
                                component={AddProduct}
                            />

                            <Route
                                exact
                                path="/retailer/products/edit/:productId"
                                component={EditProduct}
                            />

                            <Route
                                exact
                                path="/retailer/orders"
                                component={RetailerOrders}
                            />

                            {/* Admin */}
                            <ProtectedAdminRoute
                                exact
                                path="/admin"
                                component={Admin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/users"
                                component={UserAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/users/add"
                                component={AddUser}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/users/edit/:userId"
                                component={EditUser}
                                isAdmin={isAdmin()}
                            />

                            <ProtectedAdminRoute
                                exact
                                path="/admin/retailers"
                                component={RetailerAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/retailers/add"
                                component={AddRetailerAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/retailers/edit/:retailerId"
                                component={EditRetailerAdmin}
                                isAdmin={isAdmin()}
                            />

                            <ProtectedAdminRoute
                                exact
                                path="/admin/products"
                                component={ProductAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/products/add"
                                component={AddProductAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/products/edit/:productId"
                                component={EditProductAdmin}
                                isAdmin={isAdmin()}
                            />

                            <ProtectedAdminRoute
                                exact
                                path="/admin/categories"
                                component={AdminCategory}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/categories/add"
                                component={AddCategoryAdmin}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/categories/edit/:categoryId"
                                component={EditCategoryAdmin}
                                isAdmin={isAdmin()}
                            />

                            <ProtectedAdminRoute
                                exact
                                path="/admin/sub-categories"
                                component={SubCategory}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/sub-categories/add"
                                component={AddSubCategory}
                                isAdmin={isAdmin()}
                            />
                            <ProtectedAdminRoute
                                exact
                                path="/admin/sub-categories/edit/:subCategoryId"
                                component={EditSubCategory}
                                isAdmin={isAdmin()}
                            />
                            {/* <Footer /> */}

                            <Route
                                exact
                                path={[
                                    '/auth',
                                    '/',
                                    '/about-us',
                                    '/new-arrivals',
                                    '/customer/login',
                                    '/customer/signup',
                                    '/customer/verify-email/:token',
                                    '/customer/forgot-password',
                                    '/customer/reset-password/:token',
                                    '/retailer/login',
                                    '/retailer/signup',
                                    '/retailer/verify-email/:token',
                                    '/retailer/forgot-password',
                                    '/retailer/reset-password/:token',
                                    '/products/:productId',
                                    '/cart',
                                    '/checkout',
                                    '/checkout/complete',
                                    '/orders',
                                    '/profile',
                                    '/profile/edit',
                                    '/profile/change-password',
                                    '/wishlist',
                                    '/search',
                                    '/category/:categoryName',
                                ]}
                                component={Footer}
                            />
                        </CartContext.Provider>
                    </UserContext.Provider>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
}

export default App;
