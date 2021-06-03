import React, { useState } from "react";
import axios from '../axios'
import { useToasts } from 'react-toast-notifications'

const Login = ({register}) => {
  const [data, setData] = useState({ email: "", password: "" });
  const { addToast } = useToasts()


  const handleChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("State", {...data})
      await axios.post(("/users/login"), { ...data });

      localStorage.setItem("previousLogin", true);

      window.location.href = "/";
    } catch (err) {
      addToast(
        `Error ${err.response.status}: ${
          err.response.data.message || err.response.statusText
        }`,
        { appearance: "error" }
      );
    }
  };

  return (
    <div className="center">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="h1">Login</h1>
        <input
          type="text"
          className="input"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleChange(e, "email")}
          name="email"
          autoFocus
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={data.password}
          onChange={(e) => handleChange(e, "password")}
          name="password"
        />
        <button className="btn">Login</button>
        <span onClick={register} className="underline cursor-pointer">
          New User? Signup
        </span>
      </form>
    </div>
  );
};

export default Login;
