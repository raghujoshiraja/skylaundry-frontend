import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Logo from "../images/logo.svg";
import Menu from "../images/menu.svg";
import axios from "../axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const state = useContext(GlobalState);
  const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [isDriver, setIsDriver] = state.userAPI.isDriver;

  useEffect(() => {
    const checkToOpen = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", checkToOpen);
    return () => {
      window.removeEventListener("resize", checkToOpen);
    };
  }, []);

  const handleLogout = async () => {
    await axios.get("/users/logout");

    localStorage.removeItem("previousLogin");

    window.location.href = "/";
  };
  const CommonRouter = () => {
    return (
      <>
        <Link to="/">Home</Link>
      </>
    );
  };
  const AdminRouter = () => {
    return (
      <>
        <Link to="/">Categories</Link>
        <Link to="/">Manage Orders</Link>
      </>
    );
  };
  const DriverRouter = () => {
    return (
      <>
        <Link to="/">My Assignments</Link>
      </>
    );
  };
  const CustomerRouter = () => {
    return (
      <>
        <Link to="/order">Order</Link>
        <Link to="/">My Orders</Link>
      </>
    );
  };

  return (
    <header className="navbar h-24 flex flex-row items-center justify-between text-lg font-semibold relative">
      <Link to="/">
        <img src={Logo} alt="SkyLaundry" />
      </Link>
      <div
        className="px-4 cursor-pointer md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={Menu} alt="Menu" />
      </div>
      <nav
        className={`text-gray-500 md:block ${
          isOpen
            ? "absolute grid grid-flow-row text-center w-screen mt-60 -ml-6 bg-white border-b-2"
            : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <CommonRouter />
        {isDriver && <DriverRouter />}
        {isAdmin && <AdminRouter />}
        {!(isAdmin || isDriver) && <CustomerRouter />}
        {isLoggedIn && <Link onClick={handleLogout} to="/">Logout</Link>}
      </nav>
    </header>
  );
};

export default Header;
