import { useState, useEffect } from "react";
import axios from "../axios";
import { useToasts } from "react-toast-notifications";

const UserAPI = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [driversList, setDriversList] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "/users/infor",
            {
              headers: { Authorization: token },
            },
            { withCredentials: true }
          );

          setIsLoggedIn(true);

          setUserDetails(res.data);

          switch (res.data.role) {
            case 2:
              return setIsAdmin(true);
            case 1:
              return setIsDriver(true);
            default:
              return setIsLoggedIn(true);
          }
          // setIsAdmin(res.data)
        } catch (err) {
          addToast(
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : err,
            { appearance: "error" }
          );
        }
      };

      const getDrivers = async () => {
        axios
          .get(
            "/users/drivers",
            { headers: { Authorization: token } },
            { withCredentials: true }
          )
          .then((res) => res && res.data && setDriversList(res.data))
          .catch((err) => {
            addToast("Error: ", err && err.response && err.response.data);
            console.log(err);
          });
      };

      getUser();
      isAdmin && getDrivers();
    }
  }, [token, addToast, isAdmin]);

  const getUserDetailsById = async (id) => {
    try {
      const fetchedUserDetails = await axios.get(`/users/user_details/${id}`);
      return fetchedUserDetails.data;
    } catch (err) {
      addToast(
        err.response && err.response.data && err.response.data.message
          ? `Error ${err.response.status}: ${
              err.response.data.message || err.response.statusText || err
            }`
          : err,
        { appearance: "error" }
      );
    }
  };

  const addDriver = async () => {
    
  }

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    isDriver: [isDriver, setIsDriver],
    addDriver: addDriver,
    userDetails,
    getUserDetailsById,
    driversList: [driversList, setDriversList]
  };
};

export default UserAPI;
