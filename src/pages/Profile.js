import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import { useParams } from "react-router-dom";
import OrdersList from "../components/OrdersList";
import _ from "lodash";
import moment from "moment";
import NotFound from '../components/utils/NotFound'

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const state = useContext(GlobalState);
  const { id } = useParams();
  const [isAdmin] = state.userAPI.isAdmin;
  const [isDriver] = state.userAPI.isDriver;
  const [orders] = state.orderAPI.orders;
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

  if (!userDetails.name) return <NotFound />

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
              <button className="btn">Bill this user</button>
            </div>
          </div>
        )}
      </div>
      {(isAdmin || isDriver) && (
        <>
          <hr className="bg-black my-4" color="#000000" />
          <OrdersList
            isCollapsed={true}
            dontShowLabels
            orders={orders.filter((order) => order.clientId === id)}
          >
            <h1 className="h1">
              {isAdmin ? "All" : "Mutual"} orders (
              {orders && orders.filter((order) => order.clientId === id).length}
              )
            </h1>
          </OrdersList>
        </>
      )}
    </div>
  );
};

export default Profile;
