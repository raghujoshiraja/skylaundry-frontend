import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import _ from "lodash";
import moment from 'moment'

import Loading from "../components/utils/Loading";

const Order = (props) => {
  const state = useContext(GlobalState);
  const [orderDetails, setOrderDetails] = useState({});
  const { id } = useParams();
  const fetchOrder = state.orderAPI.fetchOrder;

  useEffect(() => {
    const initializeOrders = async () => {
      setOrderDetails(await fetchOrder(id));
    };

    if (_.isEmpty(orderDetails)) initializeOrders();
  }, [id, orderDetails, fetchOrder]);

  if (orderDetails._id === undefined) return <Loading />;

  return (
    <>
      <div className="bg-pink-400 p-20">
        <h1 className="h1">Ordered on {moment(orderDetails.createdAt).format('dddd, DD-MM-YYYY')}</h1>
      </div>
    </>
  );
};

export default Order;
