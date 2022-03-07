import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [toltal, setTotal] = useState(0);

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart">
          <img src={product.images.url} alt=""  className="img_container"/>
          <div className="box-detail">
            
              <h2>{product.title}</h2>
            
            <span>{product.price * product.quantity} VND</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
            
            <div className="amount">
              <button> - </button>
              <span>{product.quantity}</span>
              <button> + </button></div>
            <div className="delete">X</div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: {toltal} VND</h3>
        <Link to="/">Payment</Link></div>
    </div>
  );
}

export default Cart;
