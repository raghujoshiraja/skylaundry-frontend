import React, { useState, useContext } from "react";
import OrdersList from "../components/OrdersList";
import { GlobalState } from "../GlobalState";

const initialCollapedState = {
  pendingDriver: true,
  allOrders: true,
};

const Orders = () => {
  const state = useContext(GlobalState);
  const isNormalUser = !(state.userAPI.isAdmin[0] || state.userAPI.isDriver[0]);
  const [isCollapsed, setIsCollapesd] = useState(initialCollapedState);

  return (
    <div className="w-full">
      {!isNormalUser && (
        <OrdersList
          isCollapsed={isCollapsed.pendingDrivers}
          orders={state.orderAPI.orders[0].filter(
            (order) => order.status === 0
          )}
          embedded={false}
        >
          <div className="flex justify-between items-center">
            <h1 className="h1">Assign Drivers</h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsCollapesd({
                  ...isCollapsed,
                  pendingDrivers: !isCollapsed.pendingDrivers,
                });
              }}
              className="text-yellow-500 text-xl underline"
            >
              View More &gt;
            </button>
          </div>
        </OrdersList>
      )}
      <OrdersList
        isCollapsed={isCollapsed.allOrders}
        orders={state.orderAPI.orders[0].filter((order) => order.status === 0)}
        embedded={false}
      >
        <div className="flex justify-between items-center">
          <h1 className="h1">All Previous Orders</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCollapesd({
                ...isCollapsed,
                allOrders: !isCollapsed.allOrders,
              });
            }}
            className="text-yellow-500 text-xl underline"
          >
            View More &gt;
          </button>
        </div>
      </OrdersList>
    </div>
  );
};

export default Orders;
