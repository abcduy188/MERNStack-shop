import React, { useState } from "react";
import BtnRender from './BtnRender'
import axios from "axios";
import Loading from "../loading/Loading";

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
    <div className="product_card">
{
  isAdmin && <input type="checkbox" checked={product.checked} />
}

      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>{x}</span>
        
        <p>{product.description}</p>
      </div>



      <BtnRender product={product}  deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
