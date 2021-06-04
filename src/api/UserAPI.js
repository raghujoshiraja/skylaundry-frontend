import { useState, useEffect } from "react";
import axios from "../axios";

const UserAPI = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/users/infor", {
            headers: { Authorization: token },
          }, { withCredentials: true });

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
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    isDriver: [isDriver, setIsDriver],
    userDetails
  };
};

export default UserAPI;
