import React, { useState } from "react";
import axios from "axios";
import Loading from "../../utils/loading/Loading";
import {Link} from "react-router-dom"

function ProductItem({ product ,isAdmin,token,callback,setCallback}) {
  const [loading, setLoading] = useState(false);
  const deleteProduct = async()=>{
    try {
      setLoading(true);
      const destroyImage =await axios.post('/api/destroy',{public_id:product.images.public_id},{
        headers: {Authorization: token}
      })
      const deleteProduct =await axios.delete(`/api/product/${product._id}`,{
        headers: {Authorization: token}
      })
      await destroyImage
      await deleteProduct
      setLoading(false);
      setCallback(!callback);
    } catch (error) {
      alert(error.respone.data.msg)
    }
  }
  const x = product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
if(loading) return<div className="product_card"><Loading /></div> 
  return (
      <tr>
          <td>{product.title}</td>
          <td><img src={product.images.url} alt="" height="100px" /></td>
          <td>{x}</td>
          <td>
          <Link id="btn_buy" to="#!" onClick={deleteProduct}>
            Delete
          </Link>
          <Link id="btn_view" to={`/admin/edit_product/${product._id}`}>
            Edit
          </Link>
          </td>
      </tr>
  );
}

export default ProductItem;
