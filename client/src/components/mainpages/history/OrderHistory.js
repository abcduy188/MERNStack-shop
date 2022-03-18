import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;

  return (
    <div>
      <h2>History</h2>

      <h4>Bạn có {history.length} đơn hàng</h4>
      <div className="history-page">
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Ngày thanh toán</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((items) => (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
