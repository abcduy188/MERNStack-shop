import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      // like foreach, prev = 0 ; prev = itemprice + ...
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        // eslint-disable-next-line no-unused-expressions
        item.quantity === 1 ? item.quantity === 1 : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Are you sure to delete this product ?"))
      cart.forEach((item, index) => {
        if (item._id === id) {
          // https://freetuts.net/ham-array-splice-trong-javascript-4081.html
          // about splice splice(start, deleteCount)
          cart.splice(index, 1);
        }
      });
    setCart([...cart]);
    addToCart(cart);
  };

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  // payment

  const VND = total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  if (cart.length === 0) {
    return (
      <h4 style={{ textAlign: "center", fontSize: "5rem",color:"white" }}>Giỏ hàng trống</h4>
    );
  }

  return (
    <div className="row">
      <div className="left">
        {cart.map((product) => (
          <div key={product._id} className="cart">
            <img src={product.images.url} alt="" className="img_container" />
            <div className="box-detail">
              <h2>{product.title}</h2>
              {
                <span>
                  {(product.price * product.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              }
              <div className="amount">
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>
              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="right">
        <div className="total">
          <h3>Tổng cộng: {VND}</h3>
          <Link to={"/payment"}>Đặt hàng</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
