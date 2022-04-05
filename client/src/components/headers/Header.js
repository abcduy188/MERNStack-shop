import React, {useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";

import CartW from "./icon/cartw.png";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./icon/logo192.png";
function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [categories, setCategories] = state.categoryAPI.categories;
  const [category, setCategory] = state.productAPI.category;
  const [search, setSearch] = state.productAPI.search;
  const loggoutUser = async () => {
    await axios.get("/user/logout");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/admin/product">Sản phẩm</Link>
        </li>
        <li>
          <Link to="/admin/category">Danh mục</Link>
        </li>
        <li>
          <Link to="/admin/user">Người dùng</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">Lịch sử</Link>
        </li>

        <li>
          <Link to="/" onClick={loggoutUser}>
            Đăng xuất
          </Link>
        </li>
      </>
    );
  };
  const handleCategory = async (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
    setSearch("");
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li>
          <input
            type="text"
            value={search}
            placeholder="Enter your search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </li>
        <select onChange={handleCategory} className="select">
          <option value="">Tất cả sản phẩm</option>
          {categories.map((item) => (
            <option value={"category=" + item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {!isAdmin ? (
          <li>
            <Link to="/">Cửa hàng</Link>
          </li>
        ) : (
          ""
        )}
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Đăng nhập || Đăng ký</Link>
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
            <img src={CartW} alt="" width={30} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
