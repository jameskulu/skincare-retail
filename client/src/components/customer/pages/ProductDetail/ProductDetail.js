import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import NoImage from '../../../../images/noimage.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import './product-detail.css';
import './review.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import User from '../../../../images/user.png';
import UserContext from '../../../../context/UserContext';
import CartContext from '../../../../context/CartContext';
import ReactStars from 'react-rating-stars-component';
// import './review.css';

const ProductDetail = (props) => {
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const { cartData, setCartData } = useContext(CartContext);

    const [singleItem, setSingleItem] = useState([]);
    const [reviews, setReviews] = useState([]);
    const productId = props.match.params.productId;

    const [quantity, setQuantity] = useState(1);

    const [isAdded, setIsAdded] = useState();
    const [isWishlist, setIsWishlist] = useState();
    const [isReviewed, setIsReviewed] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState();

    let items = JSON.parse(localStorage.getItem('cart')) || [];

    useEffect(() => {
        const loadSingleItem = async () => {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/api/products/${productId}`
                )
                .then(async (singleItemResponse) => {
                    setSingleItem(singleItemResponse.data.data);

                    if (
                        items.some(
                            (item) =>
                                item.id === singleItemResponse.data.data.id
                        )
                    ) {
                        setIsAdded(true);
                    } else {
                        setIsAdded(false);
                    }

                    const token = localStorage.getItem('auth-token');
                    const wishlist = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/users/wishlist`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    if (
                        wishlist.data.data.some(
                            (item) =>
                                item.productId ===
                                singleItemResponse.data.data.id
                        )
                    ) {
                        setIsWishlist(true);
                    } else {
                        setIsWishlist(false);
                    }
                });
        };

        const loadReviews = async () => {
            const token = localStorage.getItem('auth-token');
            const reviewResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/${productId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setReviews(reviewResponse.data.data);

            const itemReviewResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/reviewed`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            const userResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            if (
                itemReviewResponse.data.data.some(
                    (review) =>
                        review.productId === productId &&
                        review.userId === userResponse.data.id &&
                        review.isReviewed === false
                )
            ) {
                setIsReviewed(true);
            } else {
                setIsReviewed(false);
            }
        };

        loadReviews();
        loadSingleItem();
    }, []);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const addToCart = () => {
        const totalPrice = quantity * singleItem.price;
        if (items.every((product) => product.id !== singleItem.id)) {
            items.push({
                ...singleItem,
                quantity: parseInt(quantity),
                totalPrice,
            });
            setIsAdded(true);
        }
        setCartData(items.length);
        localStorage.setItem('cart', JSON.stringify(items));
        toast.success('Product added to cart.');
    };

    const removeFromCart = () => {
        setIsAdded(false);
        const filteredItems = items.filter((product) => {
            return product.id !== singleItem.id;
        });
        setCartData(filteredItems.length);
        localStorage.setItem('cart', JSON.stringify(filteredItems));
        toast.success('Product removed from cart.');
    };

    const addToWishlist = async () => {
        if (userData.user === undefined || userData.user_type === 'retailer') {
            return history.push('/customer/login');
        }

        try {
            const data = {
                productId,
            };
            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist/add`,
                data,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setIsWishlist(true);
            toast.success('Added to wishlist.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const removeFromWishlist = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist/remove/${productId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setIsWishlist(false);
            toast.success('Removed from wishlist.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const addReview = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const newReview = {
                text: review,
                rating,
                productId,
            };
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reviews/new`,
                newReview,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            const reviewResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/${productId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setReviews(reviewResponse.data.data);
            setIsReviewed(false);
            toast.success('Review is added successfully.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="above-div">
                <h2>Product Detail</h2>
            </div>
            <div className="outer-item-detail main">
                <div className="item-detail">
                    <div className="container-fluid text-center">
                        <div className="row">
                            <div className="col-md-7 image">
                                <div className="col-xs-12 col-sm-9 col-md-9 mt-md-0 mt-3 productimg text-center">
                                    <ul class="main-detail-image-ul">
                                        <li id="slide1">
                                            <img
                                                src={
                                                    singleItem.imageURL === null
                                                        ? NoImage
                                                        : singleItem.imageURL
                                                }
                                                alt=""
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                className="
                        col-xs-12 col-md-5
                        mt-md-0 mt-3
                        product-detail
                        text-left
                    "
                            >
                                <div className="rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <div className="product-info">
                                    <div className="pname">
                                        <h3>{singleItem.name}</h3>

                                        {isWishlist ? (
                                            <i
                                                onClick={removeFromWishlist}
                                                className="fas fa-heart"
                                                id="filled-heart-icon"
                                            ></i>
                                        ) : (
                                            <i
                                                onClick={addToWishlist}
                                                className="far fa-heart"
                                            ></i>
                                        )}
                                    </div>
                                    <i className="fas fa-tag"></i>{' '}
                                    {singleItem.subCategory
                                        ? singleItem.subCategory.name
                                        : ''}
                                    <hr />
                                    <p>{singleItem.description}</p>
                                    <hr />
                                    <p className="mt-4">
                                        <span className="font-weight-bold">
                                            Rs. {singleItem.price}
                                        </span>
                                    </p>
                                    <h6 className="mt-3">Retailer:</h6>
                                    <div className="seller">
                                        <img
                                            src={
                                                singleItem.retailer
                                                    ? singleItem.retailer
                                                          .profilePicURL ===
                                                      null
                                                        ? User
                                                        : singleItem.retailer
                                                              .profilePicURL
                                                    : null
                                            }
                                            width="120px"
                                            ascpect-ratio="1/1"
                                            alt=""
                                        />
                                        <span>
                                            {singleItem.retailer
                                                ? singleItem.retailer
                                                      .companyName
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <hr />
                                <div className="rent-detail">
                                    <div className="top">
                                        <div className="detail">
                                            <h6>Authentic skin care</h6>
                                            <br></br>
                                            <h8>
                                                Recommended by skin experts
                                            </h8>
                                            <br></br>
                                            <h8>
                                                Quality guaranteed
                                            </h8>
                                        </div>
                                        <div className="detailimg">
                                            <img
                                                src={
                                                    singleItem.imageURL === null
                                                        ? NoImage
                                                        : singleItem.imageURL
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="bottom">
                                        <div className="bottom">
                                            <input
                                                type="number"
                                                defaultValue="1"
                                                min="1"
                                                max="20"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }
                                            />

                                            <br />
                                            <div className="bottom-btn">
                                                {isAdded ? (
                                                    <button
                                                        className="add-cart"
                                                        onClick={removeFromCart}
                                                    >
                                                        <i className="fas fa-shopping-cart"></i>
                                                        Remove from Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="add-cart"
                                                        onClick={addToCart}
                                                    >
                                                        <i className="fas fa-shopping-cart"></i>
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="review-container">
                    {isReviewed ? (
                        <div class="container  text-center align-items-center review-box">
                            <div class="row  rating-field col-lg-8 offset-lg-2 ">
                                <div>
                                    <h5 class="title-text text-left mb-3">
                                        Give Reviews
                                    </h5>

                                    <div class="row border">
                                        <div class="stars">
                                            <ReactStars
                                                size={30}
                                                starSpacing="15px"
                                                count={5}
                                                value={rating}
                                                onChange={ratingChanged}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <textarea
                                            value={review}
                                            onChange={(e) =>
                                                setReview(e.target.value)
                                            }
                                            class="form-control form-control-lg review-field"
                                            placeholder="Enter your review here"
                                        ></textarea>

                                        <button
                                            type="button"
                                            class="btn btn-review"
                                            onClick={addReview}
                                        >
                                            Share Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div class="container col-md-12 review-section">
                        <h5 class="title-text ml-4"> Rating and Reviews</h5>

                        {reviews.length > 0 ? (
                            <>
                                {reviews.map((review) => (
                                    <div class="row border rating-field ">
                                        <div class="col-md-0 user-details">
                                            <img
                                                src={
                                                    review.user
                                                        .profilePicURL === null
                                                        ? User
                                                        : review.user
                                                              .profilePicURL
                                                }
                                                class="rounded-circle user-img"
                                                alt="Cinque Terre"
                                            />
                                            <p>
                                                {review.user.firstName}{' '}
                                                {review.user.lastName}
                                            </p>
                                        </div>

                                        <div class="col-md-10 text-left user-review">
                                            <div class="row">
                                                <span className="ml-3">
                                                    <ReactStars
                                                        value={review.rating}
                                                        size={30}
                                                        edit={false}
                                                    ></ReactStars>
                                                </span>

                                                <div>
                                                    <p class="review-date">
                                                        {review.createdAt}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="review-text">
                                                {review.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="mt-4 ml-4">
                                <strong>No reviews available.</strong>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
