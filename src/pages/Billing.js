import React, {useContext } from "react";
import { GlobalState } from "../GlobalState";
import OrdersList from "../components/OrdersList";

const Billing = () => {
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;

  return (
    <div className="w-full max-w-2xl">
      <OrdersList orders={orders && orders.filter(order => order.status < 8)}>
        <h1 className="h1">Billing Pending for these Orders</h1>
      </OrdersList>
    </div>
  );
};

export default Billing;
