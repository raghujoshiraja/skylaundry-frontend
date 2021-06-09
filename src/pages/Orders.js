import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";
import { Link } from 'react-router-dom'
import moment from 'moment';

const Orders = ({ small }) => {
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;

  return (
    <div>
      <h1 className="h1">Order History</h1>
      <div className="listItem">
        {(small? orders.slice(4) : orders).map((order) => (
          <div className="my-2 border-black border-2 rounded-3xl px-4 py-2">
            <h4>Ordered {order.order.length} Items</h4>
            <h4>On {moment(order.createdAt).format('YYYY/MM/DD')} Items</h4>
            <Link to={`/order/${order._id}`} className="underline font-bold">View Order &gt;</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
