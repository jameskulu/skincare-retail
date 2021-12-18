import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';

const AddSubCategory =()=>{

    const history = useHistory();
    const [categories, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories`
            );
            setCategory(categoriesResponse.data.data);

            
        };
        loadCategories();
    }, []);

    const onSubCategoryAdd = async (e) => {
        e.preventDefault();

        try {
            const newSubCategory = {name, categoryId}
           console.log(newSubCategory)
            
            const token = localStorage.getItem('auth-token');
        
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/sub-categories/new`,
                newSubCategory,
                { headers: { Authorization: 'Bearer ' + token } }
                
            );

            toast.success('New Sub-Category has been added.');
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
            <h3>Add Sub-Category</h3>
            <form className="mt-4" action="" onSubmit={onSubCategoryAdd}>
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


                <button className="btn btn-lg btn-success btn-block text-uppercase mt-4" >
                    Add
                </button>
            </form>
        </div>
    </Admin>


    )
}

export default withRouter(AddSubCategory)