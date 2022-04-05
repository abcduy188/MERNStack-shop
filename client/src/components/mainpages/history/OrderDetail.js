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
            <th>Tên</th>
            <th>Đường</th>
            <th>Phường</th>
            <th>thành phố-quốc gia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.name}</td>
            <td>{orderDetail.address.street}</td>
            <td>{orderDetail.address.ward}</td>
            <td>{orderDetail.address.city+"-"+orderDetail.address.country}</td>
          </tr>
        </tbody>
      </table>
      <h4>Thông tin đơn hàng</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
            {
                orderDetail.cart.map(item=>(
                    <tr key={item._id}>
                    <td><img src={item.images.url} alt="" height="30px"/></td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.quantity* item.price).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</td>
                  </tr>
                ))
            }
         
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
