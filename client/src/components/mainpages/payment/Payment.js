import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const init = {
  country: "Viet Nam",
  city: "HCM",
  district: "",
  ward: "",
  street: "",
};

function Payment() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [address, setAddress] = useState(init);
  const handlechangeInput = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "/api/payment",
      { cart, address },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]); // set cart rong
    alert("Bạn đã order thành công");
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="product_id">Số nhà</label>
        <input
          type="text"
          name="street"
          required
          value={address.street || ""}
          onChange={handlechangeInput}
        />
      </div>
      <div className="row">
        <label htmlFor="product_id">Phường/Thị Trấn</label>
        <input
          type="text"
          name="ward"
          required
          value={address.ward || ""}
          onChange={handlechangeInput}
        />
      </div>
      <div className="row">
        <label htmlFor="product_id">Quận/Huyện</label>
        <input
          type="text"
          name="district"
          required
          value={address.district || ""}
          onChange={handlechangeInput}
        />
      </div>
      <div className="row">
        <label htmlFor="product_id">Tỉnh/Thành phố</label>
        <input
          type="text"
          name="city"
          required
          value={address.city || ""}
          onChange={handlechangeInput}
        />
      </div>
      <div className="row">
        <label htmlFor="product_id">Quốc gia</label>
        <input
          type="text"
          name="country"
          required
          value={address.country || ""}
          onChange={handlechangeInput}
        />
      </div>
      <button type="submit">Xác nhận đặt hàng</button>
    </form>
  );
}

export default Payment;
