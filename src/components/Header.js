import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Logo from "../images/logo.svg";
import Menu from "../images/menu.svg";
import axios from "../axios";
import LogoutIcon from '../images/logout.svg'

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
    await axios.get("/users/logout", { withCredentials: true });

    localStorage.removeItem("previousLogin");
    setIsLoggedIn(false);
    setIsDriver(false);
    setIsAdmin(false);

    window.location.href = "/";
  };
  const CommonRouter = () => (
    <>
      <NavLink exact activeClass="navigated" to="/">Home</NavLink>
    </>
  );

  const AdminRouter = () => (
    <>
      <NavLink exact activeClass="navigated" to="/categories">Categories</NavLink>
      <NavLink exact activeClass="navigated" to="/orders">Manage Orders</NavLink>
      <NavLink exact activeClass="navigated" to="/billing">Billing</NavLink>
    </>
  );

  const DriverRouter = () => (
    <>
      <NavLink exact activeClass="navigated" to="/orders">My Assignments</NavLink>
    </>
  );

  const CustomerRouter = () => (
    <>
      <NavLink exact activeClass="navigated" to="/orders">My Orders</NavLink>
      <NavLink exact activeClass="navigated" to="/new" className="rounded-full px-6 py-2 hover:opacity-70 transition ease-in-out border-2 border-black not-nav-link" >New Order</NavLink>
    </>
  );

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
        {isLoggedIn && (
          <Link onClick={handleLogout} to="/">
            <img className="inline-block h-full mb-1 text-black" src={LogoutIcon} alt="Logout" width="25" title="Logout" />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
