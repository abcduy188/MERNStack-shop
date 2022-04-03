import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import ProductItemAdmin from "./ProductItemAdmin";
import { Link } from "react-router-dom";
function ProductsAdmin() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;
  return (
    <>
     <li>
          <Link to="/admin/product/create">Create Product</Link>
        </li>
      <div>
        <table>
          <thead>
            <tr><th>
              Tên sản phẩm </th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>
            </th>
            </tr>
            
          </thead>
          <tbody> 
            {products.map((product)=>{
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
              })}
              </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsAdmin;
