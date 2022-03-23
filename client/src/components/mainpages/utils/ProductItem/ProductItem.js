import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product, images, isAdmin }) {
  const x = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      {images.map(
        (item) =>
          item.product_id === product._id && (
            <img key={item._id} src={item.url} alt="" />
          )
      )}

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>{x}</span>

        <p>{product.description}</p>
      </div>
      <BtnRender product={product} images={images}/>
    </div>
  );
}

export default ProductItem;
