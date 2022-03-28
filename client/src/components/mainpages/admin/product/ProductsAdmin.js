import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import ProductItemAdmin from "./ProductItemAdmin";
function ProductsAdmin() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;
  return (
    <>
      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>
             
            </th>
          </thead>
          <tbody> {products.map((product) => {
                return (
                  <ProductItemAdmin
                    key={product._id}
                    product={product}
                    isAdmin={isAdmin}
                    token={token}
                    callback={callback}
                    setCallback={setCallback}
                  />
                );
              })}</tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsAdmin;
