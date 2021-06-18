import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";

const Billing = () => {
  const state = useContext(GlobalState);
  const [orders] = state.orderAPI.orders;

  const [usersList] = state.userAPI.usersList;
  const pendingOrders = orders.filter((order) => order.paymentDone === false);
  const [paymentPendingUsers, setPendingUsers] = useState([]);
  // pendingOrders.forEach(order => setUsers([...users]))
  // pendingOrders.map(order => )

  useEffect(() => {
    usersList &&
      setPendingUsers(
        pendingOrders
          .map((order) => {
            const user = usersList.filter(
              (user) => user._id === order.clientId
            )[0];
            const prevOrder = pendingOrders.filter(
              (pend) => pend.clientId === user._id
            );
            if (prevOrder.length <= 0) return [user, order.total];
            return null;
          })
          .filter((item) => item)
      );
  }, [pendingOrders, usersList]);

  return (
    <div className="w-full max-w-2xl">
      <h1 className="h1">Billing Pending for these Users</h1>
      {paymentPendingUsers.map(([user, order]) => {
        return (
          <>
            {/* List Item */}
            <Link
              to={`/user/${user._id}`}
              className="my-2 rounded-3xl flex flex-row justify-between align-center px-6 py-4 shadow-md border-gray-100 border-2 x-full hover:-translate-y-1 hover:shadow-xl transform transition-all ease-in-out"
            >
              <div className="">
                <p className="font-bold text-xl">{user.name}</p>
                <h3 className="">{user._id}</h3>
              </div>
              <p className="text-right">
                <p className="font-bold text-xl">US$ {order}</p>
                {/* <p className="font-bold text-gray-600">Name</p> */}
              </p>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default Billing;
