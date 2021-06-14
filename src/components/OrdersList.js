import React, { useState, useContext } from "react";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
// import _ from "lodash";
import Modal from "../components/Modal";
import axios from "../axios";

const OrdersList = (
  { small, orders, children },
  showButtons = true,
  showName = true,
  embedded = true
) => {
  const state = useContext(GlobalState);
  const { addToast } = useToasts();
  const setModalIsOpen = useState(false)[0];
  const [categories] = state.categoriesAPI.categories;
  const { statusCodeMeaning } = state.orderAPI;
  const setAddDriverOrderId = useState("")[0];
  const [addDriverId, setAddDriverId] = useState("");
  const isNormalUser =
    !state.userAPI.isAdmin[0] &&
    !state.userAPI.isDriver[0] &&
    state.userAPI.isLoggedIn[0];
  const [isAdmin] = state.userAPI.isAdmin;
  const [driversList] = state.userAPI.driversList;
  const { token } = state;

  console.log(orders);

  if (!orders || orders.length < 1) return null;

  const handleAddDriver = (addDriverOrderId) => {
    axios
      .put(
        `/orders/add_driver/${addDriverOrderId}`,
        { driverId: addDriverId },
        { headers: { Authorization: token }, withCredentials: true }
      )
      .then(addToast("Driver Added Successfully"))
      .catch((err) =>
        addToast(
          err && err.response && err.response.data && err.response.data.message,
          { appearance: "error" }
        )
      );
  };

  const ModalContainer = () => (
    <Modal>
      <h1 className="h1">Add Driver</h1>
      <form
        onSubmit={(e) => {
          handleAddDriver();
        }}
        className="w-full px-10 pb-10 text-center"
      >
        <div className="text-left my-3">
          <label htmlFor="driver">Driver Name</label>
          <select
            value={addDriverId}
            onChange={(e) => {
              setAddDriverId(e.target.value);
            }}
            required
            className="input"
          >
            <option value="" disabled hidden>
              Select Driver
            </option>
            {driversList.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        {/* <button
          className="btn mt-8"
          onClick={() => handleAddDriver(addDriverOrderId)}
        >
          Add Driver
        </button> */}
      </form>
    </Modal>
  );

  return (
    <div
      className={`w-full m-auto my-5 ${
        !embedded ? "max-w-2xl" : ""
      } nested-link-container`}
    >
      <ModalContainer />
      {/* Parent */}
      {children}
      <div className="listItem w-full">
        {/* List item parent */}
        {(small ? orders.slice(4) : orders).map((order, idx) => {
          return (
            <>
              {/* List Item */}
              <div className="my-2 rounded-3xl px-6 py-4 shadow-md border-gray-100 border-2 x-full hover:-translate-y-1 hover:shadow-xl transform transition-all ease-in-out">
                <Link
                  className="overlay"
                  style={{ zIndex: -100 }}
                  to={`/order/${order._id}`}
                />
                <div className="flex flex-row items-end justify-between flex-grow inner">
                  {/* Header */}
                  <div className="flex flex-col justify-between flex-grow h-full">
                    {/* Id and Current Status */}
                    {!isNormalUser && showName && (
                      <Link to={`/user/${order.clientId}`}>
                        By {order.clientId}
                      </Link>
                    )}
                    <p
                      className={`font-bold text-xl ${
                        statusCodeMeaning[order.status][2]
                      }`}
                    >
                      {statusCodeMeaning[order.status][0]}
                    </p>
                  </div>
                  {/* Date created */}
                  <div className="flex flex-col items-end">
                    <h4 className="">{order.order.length} Items</h4>
                    <div className="">
                      <h4 className="">
                        {moment(order.createdAt).format("YYYY/MM/DD")}
                      </h4>
                    </div>
                  </div>
                </div>
                <p
                  className={`uppercase tracking-widest ${
                    statusCodeMeaning[order.status][3]
                  } text-yellow-400`}
                >
                  {/* Upcoming Status */}
                  {statusCodeMeaning[order.status][1]}
                </p>
                <div className="flex flex-row items-end justify-between flex-grow">
                  {/* First 3 items */}
                  <h3 className="">
                    {order.order
                      .slice(0, 3)
                      .map(
                        (product) =>
                          categories
                            .filter(
                              (category) => category._id === product.categoryId
                            )
                            .map((cat) => cat.name)[0]
                      )
                      .join(", ") + (order.order.length >= 3 ? ", etc." : "")}
                  </h3>
                  {/* Total Items Count */}
                  {isAdmin && (
                    <div className="-mr-2">
                      {/* Action Buttons */}
                      {order.status <= 0 && (
                        <Link
                          onClick={() => {
                            setModalIsOpen(true);
                            setAddDriverOrderId(order._id);
                          }}
                          class="btn mx-2"
                        >
                          Add Driver
                        </Link>
                      )}
                      <Link
                        onClick={() => console.log("Added Driver")}
                        class="btn mx-2"
                      >
                        View Order
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersList;
