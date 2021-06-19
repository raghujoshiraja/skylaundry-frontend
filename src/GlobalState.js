import React, { createContext, useState, useEffect } from "react";
import axios from "./axios";
import userAPI from "./api/UserAPI";
import categoriesAPI from "./api/CategoriesAPI";
import orderAPI from "./api/OrderAPI";
import { useToasts } from "react-toast-notifications";

export const GlobalState = createContext();

export default function DataProvider({ children }) {
  const { addToast } = useToasts();
  const [token, setToken] = useState(false);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const previousLogin = localStorage.getItem("previousLogin");

    if (previousLogin) {
      const refreshToken = async () => {
        try {
          const res = await axios.get("/users/refresh_token", {
            withCredentials: true,
          });

          setToken(res.data.accessToken);

          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);
        } catch (err) {
          addToast("Unable to sign in due to browser issues. Try on firefox", { appearance: 'error'});
        }
      };
      refreshToken();
    }
  }, [callback, addToast]);

  const refresh = () => setCallback(!callback);

  const state = {
    userAPI: userAPI(token),
    categoriesAPI: categoriesAPI(token),
    orderAPI: orderAPI(token),
    token: token,
    refresh,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
}
