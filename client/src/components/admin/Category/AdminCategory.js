import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';


const AdminCategory =()=>{

     const [category, setCategory] = useState([]);
    const [deleted, setDeleted] = useState([]);


    useEffect(() => {
        const loadCategory = async () => {
            const token = localStorage.getItem('auth-token');
            const categoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/categories`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            
            setCategory(categoryRes.data.data);
        };

        loadCategory();
    }, [deleted]);

    const onCategoryDelete = async (id) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/categories/delete/${id}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Category has been deleted.');
            setDeleted((prevValue) => !prevValue);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return(

        <Admin>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fas fa-table"></i>Category Table
            </div>
            <div class="card-body">
                <Link to="/admin/categories/add">
                    <button className="btn btn-success mb-4">
                        Add New Category
                    </button>
                </Link>
                <div class="table-responsive">
                    <table
                        class="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                    >
                        <thead>
                            <tr>
                                
                                <th>Name</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {category.map((categories) => {
                                return (
                                    <tr>
                                        
                                        <td>{categories.name} </td>
                                        
                                        
                                        <td>
                                            <Link
                                                to={`/admin/categories/edit/${categories.id}`}
                                                className="text-primary"
                                            >
                                                Update{' '}
                                            </Link>
                                            <Link
                                                className="text-danger"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Are you sure want to delete this Category ?'
                                                        )
                                                    ) {
                                                        onCategoryDelete(
                                                            categories.id
                                                        );
                                                    }
                                                }}
                                            >
                                                {' '}
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Admin>
    )

}

export default withRouter(AdminCategory)