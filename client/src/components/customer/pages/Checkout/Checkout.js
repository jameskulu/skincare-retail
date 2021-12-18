import './checkout.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import NoImage from '../../../../images/noimage.jpg';
import CartContext from '../../../../context/CartContext';

const Checkout = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    const { cartData, setCartData } = useContext(CartContext);
    const history = useHistory();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const [cartItems] = useState(items);

    useEffect(() => {
        cartItems.map((item) =>
            setTotalPrice((prevData) => item.totalPrice + prevData)
        );
    }, []);

    const orderItems = async (e) => {
        e.preventDefault();
        const products = [];
        cartItems.forEach((product) => {
            products.push({
                quantity: product.quantity,
                orderedDate: Date.now(),
                phoneNumber: phone,
                address: address,
                city: city,
                country: country,
                totalPrice: product.totalPrice,
                productId: product.id,
            });
        });

        try {
            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders/new`,
                { products },
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Order successfully placed');
            localStorage.setItem('cart', JSON.stringify([]));
            setCartData(0);
            history.push('/orders');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Checkout</h2>
            </div>
            <div className="checkout-container main">
                <div className="checkout-cart-table">
                    <div className="table-responsive ">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((product) => (
                                    <tr>
                                        <td>
                                            <img
                                                className="img-thumbnail"
                                                src={
                                                    product.imageURL === null
                                                        ? NoImage
                                                        : product.imageURL
                                                }
                                                alt=""
                                                height="100"
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>Rs.{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>Rs.{product.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <form onSubmit={orderItems} className="Buttom">
                    <div className="shipping-info col-sm-12 col-md-6">
                        <div>
                            <div className="form-row col-sm-12 col-md-12">
                                <h3 className="mb-4">
                                    Add Shipping Information
                                </h3>
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Address"
                                        autocomplete="off"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder="City"
                                        autocomplete="off"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                </div>
                                <select
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="form-control mb-3"
                                >
                                    <option selected="true" disabled="disabled">
                                        Country
                                    </option>
                                    <option value="Nepal">Nepal</option>
                                </select>

                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="number"
                                        placeholder="Phone Number"
                                        autocomplete="off"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    ></input>
                                </div>

                                <p className="mt-3">
                                    By placing this order, you agree to the{' '}
                                    <strong>
                                        <u>
                                            Terms of Service and Privacy Policy
                                        </u>
                                    </strong>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="billing col-sm-12 col-md-6">
                        <div className="billingpart col-sm-12 ">
                            <h2>Add Billing</h2>
                            <div className="billing-info  ">
                                <p>Sub-total</p>
                                <p>Rs. {totalPrice}</p>
                            </div>
                            <div className="billing-info ">
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <hr />

                            <div className="billing-info ">
                                <p>Order Total</p>
                                <p>Rs. {totalPrice}</p>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <b>PLACE ORDER</b>
                            </button>
                            <div className="terms">
                                <i class="fas fa-lock"></i>
                                <p>Secure Payment</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Checkout;
