import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';
const EditSubCategory =(props)=>{
    const [name, setName] = useState();
    
    const history = useHistory();
    const [categories, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const subCategoryId = props.match.params.subCategoryId

    useEffect(() => {
        const loadSingleSubCategory = async () => {
            const token = localStorage.getItem('auth-token');
            const singleCategoryRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/sub-categories/${subCategoryId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            

            setName(singleCategoryRes.data.data.name);
            
            
            
        };
        loadSingleSubCategory();

        const loadCategories = async () => {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`
            );
            setCategory(categoriesResponse.data.data);

            
        };
        loadCategories();
    }, []);

    const onSubCategoryUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedSubCategory = {name, categoryId}

            const token = localStorage.getItem('auth-token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/admin/sub-categories/update/${subCategoryId}`,
                updatedSubCategory,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            toast.success('Sub Category has been updated.');
            history.push('/admin/sub-categories');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const onCategoryChange = async (e) => {
        const id = e.target.value;
        setCategoryId(id);
      
    };
    
    return(
        <Admin>
        <div style={{ padding: '20px 40px' }}>
            <h3>Edit Sub Category</h3>
            <form className="mt-4" action="" onSubmit={onSubCategoryUpdate}>
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

                <div className="form-group">
                                <label
                                    for="exampleFormControlSelect1 "
                                    className="form-title"
                                >
                                    Category
                                </label>
                                <select
                                    className="form-control"
                                    id="itemCategory"
                                    value={categoryId}
                                    onChange={(e) =>
                                        onCategoryChange(e, categoryId)
                                    }
                                >
                                    <option selected="true" disabled="disabled">
                                        -- select a category --
                                    </option>
                                    {categories.map((category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
               
                <button className="btn btn-lg btn-success btn-block text-uppercase mt-4">
                    Update Category
                </button>
            </form>
        </div>
    </Admin>
    )
}

export default withRouter(EditSubCategory)