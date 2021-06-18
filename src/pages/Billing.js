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
        pendingOrders.map((order) => {
          return [
            usersList.filter((user) => user._id === order.clientId)[0],
            order.total,
          ];
        })
      );
  }, [pendingOrders, usersList]);

  return (
    <div className="w-full max-w-2xl">
      {paymentPendingUsers.length > 0 ? (
        paymentPendingUsers.map(([user, order]) => {
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
        })
      ) : (
        <h1 className="text-center text-3xl font-bold">
          All payments already complete :)
        </h1>
      )}
    </div>
  );
};

export default Billing;
