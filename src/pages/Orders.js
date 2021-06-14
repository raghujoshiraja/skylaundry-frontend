import React, { useContext } from "react";
import OrdersList from "../components/OrdersList";
import { GlobalState } from "../GlobalState";

const Orders = () => {
  const state = useContext(GlobalState);
  const isNormalUser = !(state.userAPI.isAdmin[0] || state.userAPI.isDriver[0]);

  return (
    <div className="w-full">
      {!isNormalUser && (
        <OrdersList orders={state.orderAPI.orders[0]} embedded={false}>
          <h1 className="h1">Assign Drivers</h1>
        </OrdersList>
      )}
      <OrdersList
        orders={state.orderAPI.orders[0].filter((order) => order.status === 0)}
        embedded={false}
      >
        <h1 className="h1">All Previous Orders</h1>
      </OrdersList>
    </div>
  );
};

export default Orders;
