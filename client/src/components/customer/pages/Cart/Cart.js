import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../../context/UserContext';
import CartContext from '../../../../context/CartContext';
import NoImage from '../../../../images/noimage.jpg';
import './cart.css';

const Cart = () => {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    const { userData } = useContext(UserContext);
    const { cartData, setCartData } = useContext(CartContext);

    const [cartProducts, setCartProducts] = useState(products);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        cartProducts.map((product) =>
            setTotalPrice((prevData) => product.totalPrice + prevData)
        );
    }, []);

    const removeProducts = async (id, totalPrice) => {
        const filteredProducts = cartProducts.filter(
            (product) => product.id !== id
        );
        setCartProducts(filteredProducts);
        setTotalPrice((prevData) => prevData - totalPrice);
        setCartData(filteredProducts.length);
        localStorage.setItem('cart', JSON.stringify(filteredProducts));
    };

    const increaseQuantity = (product) => {
        if (product.quantity < 20) {
            let result = cartProducts.map((el) =>
                el.id === product.id && el.quantity < 20
                    ? {
                          ...el,
                          quantity: (product.quantity += 1),
                          totalPrice: product.price * product.quantity,
                      }
                    : el
            );

            setCartProducts(result);
            setTotalPrice((prevData) => prevData + product.price);
            localStorage.setItem('cart', JSON.stringify(result));
        }
    };

    const decreaseQuantity = (product) => {
        if (product.quantity > 1) {
            let result = cartProducts.map((el) =>
                el.id === product.id && el.quantity > 1
                    ? {
                          ...el,
                          quantity: (product.quantity -= 1),
                          totalPrice: product.price * product.quantity,
                      }
                    : el
            );
            setCartProducts(result);
            setTotalPrice((prevData) => prevData - product.price);
            localStorage.setItem('cart', JSON.stringify(result));
        }
    };

    return (
        <>
            <div className="cart-container">
                <div className="above-div">
                    <h2>My Cart</h2>
                </div>
                <div className="main">
                    {/* <section>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 cart-heading">
                            <div class="text-center">
                                <h4 class="text-light text-center cart-title">
                                    Add to Cart
                                </h4>
                            </div>
                        </div>
                    </div>
                </section> */}

                    <div className="table-button-cart">
                        {cartProducts.length > 0 ? (
                            <div className="table-responsive ">
                                <table class="table">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartProducts.map((product) => (
                                            <tr>
                                                <td>
                                                    <Link
                                                        to={`products/${product.id}`}
                                                    >
                                                        <img
                                                            className="img-thumbnail"
                                                            src={
                                                                product.imageURL ===
                                                                null
                                                                    ? NoImage
                                                                    : product.imageURL
                                                            }
                                                            alt=""
                                                            height="100"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`products/${product.id}`}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </td>
                                                <td>Rs.{product.price}</td>
                                                <td>
                                                    <button
                                                    className="cart-btn"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    {product.quantity}
                                                    <button
                                                        className="cart-btn"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>Rs.{product.totalPrice}</td>
                                                <td>
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            background: 'none',
                                                        }}
                                                        onClick={() =>
                                                            removeProducts(
                                                                product.id,
                                                                product.totalPrice
                                                            )
                                                        }
                                                    >
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>Rs. {totalPrice}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-div">
                                <p>Your cart is empty</p>
                                <Link to="/">
                                    <button className="btn btn-Checkout">
                                        Back to home
                                    </button>
                                </Link>
                            </div>
                        )}

                        {cartProducts.length > 0 ? (
                            <div className="proceed-checkout-div">
                                <Link
                                    to={
                                        userData.user === undefined ||
                                        userData.user_type === 'retailer'
                                            ? '/customer/login'
                                            : '/checkout'
                                    }
                                >
                                    <button
                                        type="button"
                                        className="btn btn-Checkout"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
