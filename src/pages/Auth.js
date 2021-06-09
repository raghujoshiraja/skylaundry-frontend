import React, { useState } from "react";
import Logo from "../images/logo.svg";

import Login from "./Login";
import Register from "./Register";
import Footer from "../components/Footer";

const Auth = () => {
  const [screen, setScreen] = useState("LOGIN");

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="h-36 flex align-center justify-center relative pt-14">
        <img
          src={Logo}
          alt="SkyLaundry"
          className="flex-grow"
        />
      </div>
      <div className="flex-grow flex justify-center align-center">
        {screen === "LOGIN" ? (
          <Login register={() => setScreen("REGISTER")} />
        ) : (
          <Register login={() => setScreen("LOGIN")} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
