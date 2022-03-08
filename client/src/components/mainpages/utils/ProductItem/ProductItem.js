import React from "react";
import BtnRender from './BtnRender'

function ProductItem({ product ,isAdmin}) {

  
  const x = product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});

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



      <BtnRender product={product} />
    </div>
  );
}

export default ProductItem;
