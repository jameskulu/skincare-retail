import axios from "axios";
import { contains } from "jquery";
import {  useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Admin from '../Admin';


const AddCategoryAdmin =() =>{
    const history = useHistory();
    const [name, setName] = useState();


    const onCategoryAdd = async (e) => {
        e.preventDefault();

        try {
            const newCategory = {name}
           
            
            const token = localStorage.getItem('auth-token');
        
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/categories/new`,
                newCategory,
                { headers: { Authorization: 'Bearer ' + token } }
                
            );

            toast.success('New Category has been added.');
            setName('');
           

            history.push('/admin/categories');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };


    return(

        <Admin>
        <div style={{ padding: '20px 40px' }}>
            <h3>Add Category</h3>
            <form className="mt-4" action="" onSubmit={onCategoryAdd}>
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


                <button className="btn btn-lg btn-success btn-block text-uppercase mt-4" >
                    Add
                </button>
            </form>
        </div>
    </Admin>


    )
}

export default withRouter(AddCategoryAdmin)