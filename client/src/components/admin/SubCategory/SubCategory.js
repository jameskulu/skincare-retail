import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const SubCategory = ()=>{
    const [subCategory, setSubCategory] = useState([]);
    const [deleted, setDeleted] = useState([]);

    useEffect(() => {
        const loadSubCategory = async () => {
            const token = localStorage.getItem('auth-token');
            const subCategoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/sub-categories`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setSubCategory(subCategoryRes.data.data);
        };

        loadSubCategory();
    }, [deleted]);
    
    const onSubCategoryDelete = async (id) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/admin/sub-categories/delete/${id}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Sub-Category has been deleted.');
            setDeleted((prevValue) => !prevValue);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };
    return(
        <Admin>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fas fa-table"></i>Sub Category Table
            </div>
            <div class="card-body">
                <Link to="/admin/sub-categories/add">
                    <button className="btn btn-success mb-4">
                        Add Sub-Category
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
                                <th>Category</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subCategory.map((subCategories) => {
                                return (
                                    <tr>
                                        
                                        <td>{subCategories.name} </td>
                                    
                                        <td>{subCategories.category.name}</td>
                                        
                                        
                                        <td>
                                            <Link
                                                to={`/admin/sub-categories/edit/${subCategories.id}`}
                                                className="text-primary"
                                            >
                                                Update{' '}
                                            </Link>
                                            <Link
                                                className="text-danger"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Are you sure want to delete this sub category ?'
                                                        )
                                                    ) {
                                                        onSubCategoryDelete(
                                                            subCategories.id
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

export default withRouter(SubCategory)