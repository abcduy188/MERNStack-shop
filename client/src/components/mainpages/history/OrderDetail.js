import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function OrderDetail() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);

  const params = useParams();

  useEffect(() => {
    console.log(history);
    if (params.id) {
      history.forEach((element) => {

        if (element._id === params.id) {
          setOrderDetail(element);
          console.log("okela");
        }
      });
    }
  }, [params.id, history]);
  if (orderDetail.length === 0) return null;
  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal code</th>
            <th>Country code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.address.recipient_name}</td>
            <td>{orderDetail.address.line1 +"-"+orderDetail.address.city}</td>
            <td>{orderDetail.address.postal_code}</td>
            <td>{orderDetail.address.country_code}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
            {
                orderDetail.cart.map(item=>(
                    <tr key={item._id}>
                    <td><img src={item.images.url} alt="" height="30px"/></td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{ item.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</td>
                  </tr>
                ))
            }
         
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
