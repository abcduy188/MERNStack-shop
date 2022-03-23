import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";
import Loading from "../utils/loading/Loading";


function Product() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback


  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}

              token={token}
              callback={callback}
              setCallback={setCallback}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Product;
