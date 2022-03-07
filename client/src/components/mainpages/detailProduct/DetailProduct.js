import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailProduct.price);
  useEffect(() => {
   console.log('re render');
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);
  console.log(detailProduct);
  if (detailProduct.length === 0) return null;
  return (
    <>
      <div className="detail">
      <img src={detailProduct.images.url} alt="" />
      <div className="box-detail">
        <div className="row">
          <h2>{detailProduct.title}</h2>
          <h6>#id: {detailProduct.product_id}</h6>
        </div>  
        <span>{price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold: {detailProduct.sold}</p>
        <Link to="/cart" className="cart" >Mua Ngay</Link>
      </div>
    </div>
    <div>
      <h2>Sản phẩm liên quan</h2>
      <div className="products">
        {

          products.map(product=>{
            return product.category === detailProduct.category && product._id !== detailProduct._id
            ?<ProductItem key={product._id} product={product}/> : null
          })
        }
        </div>

    </div>
    </>
  
  );
}

export default DetailProduct;
