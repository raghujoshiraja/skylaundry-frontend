import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import { useParams } from "react-router-dom";
import OrdersList from "../components/OrdersList";
import _ from "lodash";
import moment from "moment";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const state = useContext(GlobalState);
  const { id } = useParams();
  const [isAdmin] = state.userAPI.isAdmin;
  const [isDriver] = state.userAPI.isDriver;
  const [orders] = state.orderAPI.orders;
  const { getUserDetailsById } = state.userAPI;

  useEffect(() => {
    if (id.length !== 24) return console.log("Useless id");
    (() => {
      getUserDetailsById(id).then((data) => setUserDetails(data));
    })();
  }, [getUserDetailsById, id]);

  return (
    <div className="w-full max-w-2xl">
      <div className="">
        <h1 className="h1">Name {_.startCase(_.toLower(userDetails.name))}</h1>
        <h4 className="gray-600">
          Joined on {moment(userDetails.createdAt).format("DD-MM-YYYY")}
        </h4>
      </div>
      {(isAdmin || isDriver) && (
        <>
          <hr className="bg-black my-4" color="#000000" />
          <h1 className="h1">
            {isAdmin ? "All" : "Mutual"} orders (
            {orders && orders.filter((order) => order.clientId === id).length})
          </h1>
          <OrdersList
            orders={orders.filter((order) => order.clientId === id)}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
