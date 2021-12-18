

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import Admin from '../Admin';


const EditCategoryAdmin = (props)=>{

    const [name, setName] = useState();
    
    const history = useHistory();

    const categoryId = props.match.params.categoryId

    useEffect(() => {
        const loadSingleCategory = async () => {
            const token = localStorage.getItem('auth-token');
            const singleCategoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/categories/${categoryId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            

            setName(singleCategoryRes.data.data.name);
            
        };
        loadSingleCategory();
    }, []);


    const onCategoryUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedCategory = {name}

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/categories/update/${categoryId}`,
                updatedCategory,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('Category has been updated.');
            history.push('/admin/categories');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return(

        <Admin>
        <div style={{ padding: '20px 40px' }}>
            <h3>Edit Category</h3>
            <form className="mt-4" action="" onSubmit={onCategoryUpdate}>
                <div className="form-group">
                    <label htmlFor="inpuTFirstname">Name</label>
                    <input
                        type="text"
                        id="inpuTFirstname"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
               
                <button className="btn btn-lg btn-success btn-block text-uppercase mt-4">
                    Update Category
                </button>
            </form>
        </div>
    </Admin>


    )
}

export default withRouter(EditCategoryAdmin)