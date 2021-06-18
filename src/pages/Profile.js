import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import { useParams } from "react-router-dom";
import OrdersList from "../components/OrdersList";
import _ from "lodash";
import moment from "moment";
import NotFound from "../components/utils/NotFound";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const state = useContext(GlobalState);
  const { id } = useParams();
  const [isAdmin] = state.userAPI.isAdmin;
  const [isDriver] = state.userAPI.isDriver;
  const [orders] = state.orderAPI.orders;
  const { handleConfirmPayments: confirmPayments } = state.orderAPI;
  const { getUserDetailsById } = state.userAPI;
  const [usersList] = state.userAPI.usersList;

  useEffect(() => {
    if (id.length !== 24) return console.log("Useless id");
    (() => {
      setUserDetails(
        usersList ? usersList.filter((user) => user._id === id)[0] : {}
      );
    })();
  }, [getUserDetailsById, id, usersList]);

  if (!userDetails.name) return <NotFound />;

  const personalOrders = orders.filter((order) => order.clientId === id);
  orders.filter((order) => order.clientId === id);

  return (
    <div className="w-full max-w-2xl">
      <div className="">
        <h1 className="h1">Name: {_.startCase(_.toLower(userDetails.name))}</h1>
        <h4 className="gray-600">
          Joined on{" "}
          {moment(userDetails.createdAt).format("DD-MM-YYYY [at] hh:mm:ss a")}
        </h4>
        <h4 className="gray-600">Id: {userDetails._id}</h4>
        {isAdmin && (
          <div className="font-semibold text-xl my-5">
            <hr style={{ width: "50%" }} />
            <h2>Available Actions</h2>
            <div className="my-2">
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  confirmPayments({ userId: userDetails._id });
                }}
              >
                Bill this user
              </button>
            </div>
          </div>
        )}
      </div>
      {(isAdmin || isDriver) && (
        <div className="my-10">
          <hr className="bg-black my-4" color="#000000" />
          <OrdersList isCollapsed={true} dontShowLabels orders={personalOrders}>
            <h1 className="h1">
              {isAdmin ? "All" : "Mutual"} orders (
              {orders && personalOrders.length})
            </h1>
          </OrdersList>
          <hr className="bg-black my-4" color="#000000" />
          <h2 className="font-bold text-xl text-right">
            Total Price: US ${" "}
            {personalOrders
              .filter((order) => !order.paymentDone)
              .map((order) => order.total)
              .reduce((a, b) => a + b, 0)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
