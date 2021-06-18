import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ModalContainer from "./Modal";
import moment from "moment";
import NotFound from "./utils/NotFound";
import { FiFilter } from "react-icons/fi";
// import _ from "lodash";
import axios from "../axios";

const OrdersList = (
  {
    small,
    orders: sourceOrders,
    initialFilter,
    children,
    isCollapsed,
    dontShowLabels,
  },
  showButtons = true,
  embedded = true
) => {
  const state = useContext(GlobalState);
  const { addToast } = useToasts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories] = state.categoriesAPI.categories;
  const { statusCodeMeaning, refreshOrders } = state.orderAPI;
  const [addDriverOrderId, setAddDriverOrderId] = useState("");
  const [addDriverId, setAddDriverId] = useState("");
  const isNormalUser =
    !state.userAPI.isAdmin[0] &&
    !state.userAPI.isDriver[0] &&
    state.userAPI.isLoggedIn[0];
  const [isAdmin] = state.userAPI.isAdmin;
  const usersList = state.userAPI.usersList[0]
    ? state.userAPI.usersList[0]
    : [];
  const driversList = state.userAPI.usersList[0]
    ? state.userAPI.usersList[0].filter((user) => user.role === 1)
    : [];
  const { token } = state;
  const [currentFilter, setCurrentFilter] = useState(initialFilter || "");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // For Filtering orders
    setOrders(
      currentFilter
        ? sourceOrders.filter(
            (order) => Number(order.status) === Number(currentFilter)
          )
        : sourceOrders
    );
  }, [sourceOrders, currentFilter, setOrders]);

  const isEmptyResponse = !orders || orders.length < 1;

  const ModalContent = () => (
    <>
      <h1 className="h1">Add Driver</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <button
          className="btn mt-8"
          onClick={() => handleAddDriver(addDriverOrderId)}
        >
          Add Driver
        </button>
      </form>
    </>
  );

  const handleAddDriver = () => {
    axios
      .put(
        `/orders/change_status/${addDriverOrderId}/1`,
        { driverId: addDriverId },
        { headers: { Authorization: token }, withCredentials: true }
      )
      .then((res) => {
        if (res && res.data) {
          addToast("Driver Added Successfully", { appearance: "success" });
          setIsModalOpen(false);
          setAddDriverOrderId("");
          refreshOrders();
        }
      })
      .catch((err) =>
        addToast(
          err && err.response && err.response.data && err.response.data.message,
          { appearance: "error" }
        )
      );
  };

  const AdminControls = ({ order }) => (
    <div className="-mr-2">
      {/* Action Buttons */}
      {order.status <= 0 && (
        <Link
          onClick={() => {
            setIsModalOpen(true);
            setAddDriverOrderId(order._id);
          }}
          class="btn mx-2"
        >
          Add Driver
        </Link>
      )}
      <Link onClick={() => console.log("Added Driver")} class="btn mx-2">
        View Order
      </Link>
    </div>
  );

  const OrderList = () =>
    orders.map((order, idx) => {
      return (
        <>
          {/* List Item */}
          <div className="my-2 rounded-3xl px-6 py-4 shadow-md border-gray-100 border-2 x-full hover:-translate-y-1 hover:shadow-xl transform transition-all ease-in-out">
            <Link
              className="overlay"
              style={{ top: 0, bottom: 0, left: 0, right: 0, zIndex: -100 }}
              to={`/order/${order._id}`}
            />
            <div className="flex flex-row items-end justify-between flex-grow inner">
              {/* Header */}
              <div className="flex flex-col justify-between flex-grow h-full">
                {/* Id and Current Status */}
                {!isNormalUser && !dontShowLabels && (
                  <Link to={`/user/${order.clientId}`}>
                    By{" "}
                    <span className="underline">
                      {usersList.filter((user) => user._id === order.clientId)[0].name}
                    </span>
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
              <div className="">
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
                <h3
                  className={`font-semibold ${
                    order.paymentDone ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  US ${order.total} {order.paymentDone ? "Done" : "Pending"}
                </h3>
              </div>
              {/* Total Items Count */}
              {isAdmin && isCollapsed && <AdminControls order={order} />}
            </div>
          </div>
        </>
      );
    });

  return (
    <div
      className={`w-full m-auto my-5 ${
        !embedded ? "max-w-2xl" : ""
      } nested-link-container`}
    >
      <ModalContainer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <ModalContent />
      </ModalContainer>
      {/* Parent */}
      <div className="flex align-center justify-end">
        <div className="rounded-2xl p-2 border-2 border-solid flex align-center justify-center">
          <FiFilter className="mx-2 mt-1" />
          <select
            default={"-1"}
            className=""
            value={currentFilter}
            onChange={(e) => setCurrentFilter(e.target.value)}
          >
            <option value="">All orders</option>
            {Object.values(statusCodeMeaning).map((code, idx) => (
              <option value={idx}>{code[0]}</option>
            ))}
          </select>
        </div>
      </div>
      {children}
      <div
        className={`listItem w-full ${
          !isCollapsed && "grid gap-4 grid-flow-3 grid-cols-3"
        }`}
      >
        {/* List item parent */}
        {isEmptyResponse ? (
          <div className="grid place-items-center">
            <NotFound />
          </div>
        ) : (
          <>
            <OrderList />
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
