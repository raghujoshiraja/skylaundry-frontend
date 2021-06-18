import React, { useState } from "react";
import axios from "../axios";
import { useToasts } from "react-toast-notifications";

const Register = ({ login }) => {
  const { addToast } = useToasts();
  const [data, setData] = useState({name: "", email: "", password: "",});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/users/signup", data, { withCredentials: true })
        .then((res) => {
          localStorage.setItem("previousLogin", true);

          window.location.href = "/";
        })
        .catch((err) => {
          addToast(
            `Error ${err.response.status}: ${
              err.response.data.message || err.response.statusText || err
            }`,
            { appearance: "error" }
          );
        });
    } catch (err) {
      addToast(
        `Error ${err.response.status}: ${
          err.response.data.message || err.response.statusText
        }`,
        { appearance: "error" }
      );
    }
  };
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="center">
      <form className="form max-w-md" onSubmit={handleSubmit}>
        <h1 className="h1">Sign up</h1>
        <input
          type="text"
          className="input"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
        <button
          className="btn max-w-md"
        >
          Sign Up
        </button>
        <span onClick={login} className="underline cursor-pointer">
          Already a user? Login
        </span>
      </form>
    </div>
  );
};

export default Register;
