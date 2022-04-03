import React,{useState, useContext} from 'react'
import {GlobalState} from '../../../../GlobalState';
import axios from 'axios';
function Categories() {
    const state = useContext(GlobalState);
    const [categories, setCategories] = state.categoryAPI.categories
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback,setCallback] = state.categoryAPI.callback;
    const [edit, setEdit] = useState(false);
    const [id,setID] = useState('');
    const createCategory =async e =>{
        e.preventDefault()
        try {
            if(edit)
            {
                const res = await axios.put(`/api/category/update/${id}`, {name:category},{
                    headers: {Authorization: token}
                })
                alert(res.data);
            }else{
                const res = await axios.post('/api/category', {name:category},{
                    headers: {Authorization: token}
                })
                alert(res.data);
            }
            setCallback(!callback);
            setEdit(false);
           
        } catch (error) {
            alert(error.respone.data.msg);
        }
    }
    const editCategory = async (id,name)=>{
        setID(id);
        setCategory(name);
        setEdit(true);
    }
    const deleteCategory = async(id)=>{
        try {
            const res = await axios.delete(`/api/category/delete/${id}`,{
                headers: {Authorization: token}
            })
            alert(res.data.msg);
            setCallback(!callback);
        } catch (error) {
            alert(error.respone.data.msg);
        }
    }
  return (
    <div className='categories'>
        <form onSubmit={createCategory}>
            <label htmlFor="category">category</label>
            <input type="text" name="category" value={category} required 
            onChange={e=>setCategory(e.target.value)}/>
            <button type='submit' >{edit? "Cập nhật" :"Thêm"}</button>
        </form>
        <div className="col">
            {
                categories.map(item =>(
                    <div className="row" key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={()=>editCategory(item._id, item.name)}>Chỉnh sửa</button>
                                <button onClick={()=>deleteCategory(item._id)}>Xóa</button>
                            </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories