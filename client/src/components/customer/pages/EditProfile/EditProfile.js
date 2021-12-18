import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../../context/UserContext';
import axios from 'axios';
import './edit-profile.css';
import User from '../../../../images/user.png';

const EditProfile = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [image, setImage] = useState();
    const [viewImage, setViewImage] = useState();

    useEffect(() => {
        const loadUserDetails = async () => {
            const token = localStorage.getItem('auth-token');
            const userDetailsResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/profile`,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            setFirstName(userDetailsResponse.data.data.firstName);
            setLastName(userDetailsResponse.data.data.lastName);
            setGender(userDetailsResponse.data.data.gender);
            setAddress(userDetailsResponse.data.data.address);
            setCity(userDetailsResponse.data.data.city);
            setCountry(userDetailsResponse.data.data.country);
            setImage(userDetailsResponse.data.data.profilePicURL);
            setViewImage(userDetailsResponse.data.data.profilePicURL);
        };

        loadUserDetails();
    }, []);

    const onEditProfile = async (e) => {
        e.preventDefault();
        try {
            const updateUser = new FormData();
            updateUser.append('image', image);
            updateUser.append('firstName', firstName);
            updateUser.append('lastName', lastName);
            updateUser.append('gender', gender);
            updateUser.append('address', address);
            updateUser.append('city', city);
            updateUser.append('country', country);

            const token = localStorage.getItem('auth-token');
            const userResponse = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/users/profile/edit`,
                updateUser,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setUserData({
                token,
                user: userResponse.data.data,
            });

            toast.success('Profile updated');
            history.push('/profile');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const changeImage = (e) => {
        setImage(e.target.files[0]);
        setViewImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <>
            <div className="above-div">
                <h2>Edit Profile</h2>
            </div>
            <div className="edit-profile-container main">
                <div class="container">
                    <div class="row">
                        <div class="img">
                            <div class="edit-btn">
                                <img
                                    src={viewImage === null ? User : viewImage}
                                    class="rounded-circle mx-auto d-block"
                                    alt=""
                                    width="130"
                                    height="140"
                                />
                                <input
                                    id="editprofileinput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                                {/* <button class="butn btn-primary">
                                <i class="fas fa-pen"></i>
                            </button> */}
                                <label class="butn btn-primary" for="fusk">
                                    <i class="fas fa-pen"></i>
                                </label>
                                <input
                                    onChange={(e) => changeImage(e)}
                                    id="fusk"
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div class="form-info col-sm-8 col-md-7">
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="Firstname">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="Firstname"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Lastname">Last Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="Lastname"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="Phone Number">Gender</label>
                                    <select
                                        class="form-control"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        value={gender}
                                        name=""
                                        id=""
                                    >
                                        <option value="ma">Male</option>
                                        <option value="fe">Female</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="Address">Address</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="Address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="City">City</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="City"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Country">Country</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="Country"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    onClick={onEditProfile}
                                    id="updatebtn"
                                    class="btn btn-primary mt-3"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
