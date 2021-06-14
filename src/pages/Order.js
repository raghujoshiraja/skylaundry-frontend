import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import _ from "lodash";
// import moment from "moment";
// import { useToasts } from "react-toast-notifications";

import Loading from "../components/utils/Loading";

const Order = ({ children }) => {
  const state = useContext(GlobalState);
  const [orderDetails, setOrderDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  // const { statusCodeMeaning } = state.orderAPI;
  const [categories] = state.categoriesAPI.categories;
  const { id } = useParams();
  const fetchOrder = state.orderAPI.fetchOrder;
  // const { addToast } = useToasts();
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [addDriverOrderId, setAddDriverOrderId] = useState("");
  // const [addDriverId, setAddDriverId] = useState("");
  // const isNormalUser =
  //   !state.userAPI.isAdmin[0] &&
  //   !state.userAPI.isDriver[0] &&
  //   state.userAPI.isLoggedIn[0];
  // const [isAdmin] = state.userAPI.isAdmin;
  // const [driversList] = state.userAPI.driversList;

  useEffect(() => {
    const initializeOrders = async () => {
      setOrderDetails(await fetchOrder(id));
    };
    orderDetails &&
      orderDetails.clientId &&
      (async () => {
        state.userAPI
          .getUserDetailsById(orderDetails.clientId)
          .then((data) => setCustomerDetails(data));
      })();

    if (_.isEmpty(orderDetails)) initializeOrders();
  }, [id, orderDetails, fetchOrder, state.userAPI]);

  if (orderDetails._id === undefined) return <Loading />;

  const ItemList = () =>
    orderDetails.order.map((item, idx) => {
      const category = categories.filter(
        (cat) => cat._id === item.categoryId
      )[0];
      return (
        <>
          {/* List Item */}
          <div className="my-2 rounded-3xl flex flex-row justify-between align-center px-6 py-4 shadow-md border-gray-100 border-2 x-full hover:-translate-y-1 hover:shadow-xl transform transition-all ease-in-out">
            <div className="">
              <p className="font-bold text-xl">
                {_.startCase(_.toLower(category.name))}
              </p>
              <h3 className="">{item.weight} kg</h3>
            </div>
            <p className="text-right">
              <p className="font-bold text-xl">
                US $ {category.price * item.weight}
              </p>
              <p className="font-bold text-gray-600">
                US $ {category.price} per KG
              </p>
            </p>
          </div>
        </>
      );
    });

  return (
    <>
      <div className={`w-full m-auto my-5 max-w-xl nested-link-container`}>
        <div className="">
          <h1 className="h1">Order Details</h1>
          <h1 className="font-semibold text-lg">
            By <Link to={`/user/${customerDetails._id}`} className="underline">{_.startCase(_.toLower(customerDetails.name))}</Link>
          </h1>
          
        </div>
        <hr />
        <div className="listItem w-full my-5">
          <ItemList />
        </div>
        <hr />
        <p className="text-right">Total Cost: {orderDetails.price}</p>
      </div>
    </>
  );
};

export default Order;
