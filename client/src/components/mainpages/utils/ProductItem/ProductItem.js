import React, {useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
function ProductItem({ product ,isAdmin,token,callback,setCallback}) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const x = product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
  return (
    <div className="product_card">

      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>{x}</span>
        
        <p>{product.description}</p>
      </div>
      <div className="row_btn">
          <Link id="btn_buy" to="#!" onClick={()=> addCart(product)}>
            Mua
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            Xem
          </Link>
    </div>
    </div>
  );
}

export default ProductItem;
