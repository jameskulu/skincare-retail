import React, { useContext } from 'react';
import UserContext from '../../../../context/UserContext';
import { Link } from 'react-router-dom';
import './profile.css';
import User from '../../../../images/user.png';

const Profile = () => {
    const { userData, setUserData } = useContext(UserContext);
    return (
        <>
            <div className="above-div">
                <h2>My Profile</h2>
            </div>
            <div className="profile-container main">
                <div class="container">
                    <div class="row">
                        {userData.user ? (
                            <>
                                <div class="img">
                                    <img
                                        src={
                                            userData.user.profilePicURL === null
                                                ? User
                                                : userData.user.profilePicURL
                                        }
                                        class="rounded-circle mx-auto d-block"
                                        alt=""
                                        width="130"
                                        height="140"
                                    />
                                </div>

                                <div class="information text-center col-12 col-sm-6 col-md-5">
                                    <div class="personal-detail">
                                        <div class="f ">
                                            <label
                                                for="FirstName"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                First Name :
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.firstName}
                                            </p>
                                        </div>
                                        <div class="l">
                                            <label
                                                for="Lastname"
                                                class=" col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                Last Name :{' '}
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.lastName}
                                            </p>
                                        </div>
                                        <div class="a">
                                            <label
                                                for="Email"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                Email :
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.email}
                                            </p>
                                        </div>
                                        <div class="b">
                                            <label
                                                for="Number"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                Gender :
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.gender === 'ma'
                                                    ? 'Male'
                                                    : 'Female'}
                                            </p>
                                        </div>
                                        <div class="c">
                                            <label
                                                for="Address"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                Address :{' '}
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.address}
                                            </p>
                                        </div>
                                        <div class="d">
                                            <label
                                                for="City"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                City :{' '}
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.city}
                                            </p>
                                        </div>
                                        <div class="e">
                                            <label
                                                for="Country"
                                                class="col-4 col-md-4 offset-md-2 text-left"
                                            >
                                                Country :{' '}
                                            </label>
                                            <p class="col-4 col-md-4 text-left">
                                                {userData.user.country}
                                            </p>
                                        </div>
                                        <Link to={`/profile/edit`}>
                                            <button
                                                id="profilebtn"
                                                class="btn btn-primary mt-3"
                                            >
                                                Edit Profile
                                            </button>
                                        </Link>
                                        <Link to={`/profile/change-password`}>
                                            <button
                                                id="pswrdbtn"
                                                class="btn btn-danger mt-3"
                                            >
                                                Change Password
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
