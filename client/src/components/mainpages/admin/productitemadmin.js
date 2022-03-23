import React from "react";
import BtnRender from "../utils/ProductItem/BtnRender";

function ProductItem({ product, isAdmin }) {
  const x = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <tr>
      <td>  <input type="checkbox" checked={product.checked} /></td>
    
      <td>{product.title}</td>
        <td> <img className="imgproduct" src={product.images.url} alt="" /></td>
        
        <td></td>

      <BtnRender product={product} />
    </tr>
  );
}

export default ProductItem;
