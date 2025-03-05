import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NoNavbar from "@/src/layouts/no-navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/user/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success(`Logging in "${values.email}"!`, {
          onClose: () => {
            setTimeout(() => {
              router.push("/admin");
            });
          },
        });
      })
      .catch((err) => {
        toast.error(
          `Error logging in: "${err.response?.data.error}". Please try again.`
        );
        console.log(err);
      });
  };

  return (
    <NoNavbar>
      <ToastContainer />
      <div className="login">
        <div className="wrapper">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </NoNavbar>
  );
}

export default Login;
