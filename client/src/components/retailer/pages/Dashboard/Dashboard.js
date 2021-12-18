import { useEffect, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import './dashboard.css';
import swal from 'sweetalert';
import UserContext from '../../../../context/UserContext';
import { toast } from 'react-toastify';
import Logo from '../../../../images/logo.png';

const Dashboard = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

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

    useEffect(() => {
        let sidebar = document.querySelector('.sidebar');
        let closeBtn = document.querySelector('#btn');
        let searchBtn = document.querySelector('.bx-search');

        closeBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            menuBtnChange(); //calling the function(optional)
        });

        searchBtn.addEventListener('click', () => {
            // Sidebar open when you click on the search iocn
            sidebar.classList.toggle('open');
            menuBtnChange(); //calling the function(optional)
        });

        // following are the code to change sidebar button(optional)
        function menuBtnChange() {
            if (sidebar.classList.contains('open')) {
                closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns className
            } else {
                closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns className
            }
        }
    }, []);

    return (
        <div className="retailer-dashboard">
            <div className="sidebar open">
                <div className="logo-details">
                    <div className="logo_name">Retailer Dashboard</div>
                    <i className="bx bx-menu" id="btn"></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <i className="bx bx-search"></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li>
                    <li>
                        <Link to="/retailer/dashboard">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    {/* <li>
                        <a href="#">
                            <i className="bx bx-user"></i>
                            <span className="links_name">User</span>
                        </a>
                        <span className="tooltip">User</span>
                    </li> */}

                    <li>
                        <Link to="/retailer/add-product">
                            <i className="bx bx-carousel"></i>
                            <span className="links_name">Add Product</span>
                        </Link>
                        <span className="tooltip">Add Product</span>
                    </li>

                    <li>
                        <Link to="/retailer/orders">
                            <i className="bx bx-cart-alt"></i>
                            <span className="links_name">Order</span>
                        </Link>
                        <span className="tooltip">Order</span>
                    </li>

                    <li className="profile">
                        {userData.user ? (
                            <div className="profile-details">
                                <div className="name_job">
                                    <div className="name">
                                        {userData.user.companyName}
                                    </div>

                                    <div className="job">{userData.user.location}</div>
                                </div>
                            </div>
                        ) : null}
                        <Link onClick={logout}>
                            <i className="bx bx-log-out" id="log_out"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            <section className="home-section">{props.children}</section>
        </div>
    );
};

export default withRouter(Dashboard);
