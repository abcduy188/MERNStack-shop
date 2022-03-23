import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const loggoutUser = async () => {
    await axios.get("/user/logout");
    window.location.href='/';
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/admin/product">Create Product</Link>
        </li>
        <li>
          <Link to="/admin/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>

        <li>
          <Link to="/" onClick={loggoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30px" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "ABCDUY"}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin ? "Product" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login || register</Link>
          </li>
        )}

        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          {cart.length > 0 ? <span>{cart.length}</span> : <span>0</span>}

          <Link to="/cart">
            <img src={Cart} alt="" width={30} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
