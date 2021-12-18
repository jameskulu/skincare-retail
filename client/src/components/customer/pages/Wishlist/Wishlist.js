import './wishlist.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import NoImage from '../../../../images/noimage.jpg';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const getMyWishlist = async () => {
            const token = localStorage.getItem('auth-token');
            const wishlistResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setWishlist(wishlistResponse.data.data);
        };
        getMyWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        swal({
            title: 'Are you sure want to remove this item from wishlist?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem('auth-token');
                    await axios.delete(
                        `${process.env.REACT_APP_API_URL}/api/users/wishlist/remove/${productId}`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const wishlistResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/users/wishlist`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    setWishlist(wishlistResponse.data.data);
                    toast.success('Removed from wishlist.');
                } catch (err) {
                    toast.error(err.response.data.message);
                }
            }
        });
    };

    return (
        <>
            <div className="above-div">
                <h2>My Wishlist</h2>
            </div>
            <div class="wishlist-container main">
                <div class="container-fluid">
                    {/* <section>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 cart-heading">
                            <div class="text-center">
                                <h4 class="text-light text-center cart-title">
                                    My Wishlist
                                </h4>
                            </div>
                        </div>
                    </div>
                </section> */}

                    {wishlist.length > 0 ? (
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Item</th>
                                        <th rowspan="11" scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.map((wish) => (
                                        <tr>
                                            <td>
                                                <Link
                                                    to={`/products/${wish.product.id}`}
                                                >
                                                    <img
                                                        class="img-fluid img-thumbnail"
                                                        src={
                                                            wish.product
                                                                .imageURL ===
                                                            null
                                                                ? NoImage
                                                                : wish.product
                                                                      .imageURL
                                                        }
                                                        alt=""
                                                    />
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/products/${wish.product.id}`}
                                                >
                                                    <p class="text-uppercase">
                                                        {wish.product.name}
                                                    </p>
                                                </Link>
                                                <p>
                                                    {
                                                        wish.product.subCategory
                                                            .name
                                                    }
                                                </p>
                                                <p>Rs. {wish.product.price}</p>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                            {/* <td id="iconedit">
                                        <i class="fas fa-cart-plus"></i>
                                    </td> */}
                                            <td id="icondel">
                                                <i
                                                    onClick={() =>
                                                        removeFromWishlist(
                                                            wish.product.id
                                                        )
                                                    }
                                                    class="fas fa-times"
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-div">
                            <p>Your wishlist is empty.</p>
                            <Link to="/">
                                <button className="btn">Back to home</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Wishlist;
