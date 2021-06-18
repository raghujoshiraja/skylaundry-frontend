import { useState, useEffect } from "react";
import axios from "../axios";
import { useToasts } from "react-toast-notifications";

const statusCodeMeaning = {
  0: [
    "Ordered",
    "Waiting for alloting driver",
    "text-yellow-600",
    "text-yellow-500",
  ],
  1: [
    "Driver allotted",
    "Ready for pick up",
    "text-yellow-700",
    "text-yellow-600",
  ],
  2: ["Picked Up", "ready to wash", "text-yellow-800", "text-yellow-700"],
  3: [
    "In wash cycle",
    "To be prepared for Delivery",
    "text-yellow-900",
    "text-yellow-800",
  ],
  4: ["Washed", "Ready to be deliverd", "text-green-500", "text-yellow-900"],
  5: [
    "Delivery Driver Allotted",
    "Waiting for departure",
    "text-green-600",
    "text-yellow-500",
  ],
  6: [
    "Delivered by delivery Driver",
    "Order Complete",
    "text-green-700",
    "text-yellow-500",
  ],
};

const OrderAPI = (token) => {
  const { addToast } = useToasts();
  const [orders, setOrders] = useState([]);
  const [refreshOrdersVar, setRefreshOrdersVar] = useState(false);

  useEffect(() => {
    if (!token) return; // don't proceed if not logged in

    const fetchOrders = async () => {
      try {
        const fetchedOrders = await axios.get("/orders", {
          headers: { Authorization: token },
          withCredentials: true,
        });

        setOrders([...fetchedOrders.data]);
      } catch (err) {
        addToast(
          `Error ${
            err.response !== undefined
              ? err.response.status + ": " + err.response.data.message ||
                err.response.statusText
              : err
          }}`,
          { appearance: "error" }
        );
      }
    };

    fetchOrders();
  }, [token, refreshOrdersVar, addToast]);

  const fetchOrder = async (id) => {
    try {
      const fetchedOrder = await axios.get(`/orders/${id}`, {
        headers: { Authorization: token },
        withCredentials: true,
      });

      return fetchedOrder.data;
    } catch (err) {
      addToast(
        `Error ${
          err.response !== undefined
            ? err.response.status + ": " + err.response.data.message ||
              err.response.statusText
            : err
        }}`,
        { appearance: "error" }
      );
      return {};
    }
  };

  const createOrder = (order) => {
    // Param <Order>: Array of orders
    axios
      .post(
        "/orders",
        { order },
        { headers: { Authorization: token }, withCredentials: true }
      )
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        refreshOrders();
        return true;
      })
      .catch((err) => {
        addToast(
          `Error ${err.response.status}: ${
            err.response.data.message || err.response.statusText
          }`,
          { appearance: "error" }
        );
        return false;
      });
  };

  const refreshOrders = () => setRefreshOrdersVar(!refreshOrdersVar);

  return {
    orders: [orders, setOrders],
    createOrder,
    refreshOrders,
    fetchOrder,
    statusCodeMeaning,
  };
};

export default OrderAPI;
