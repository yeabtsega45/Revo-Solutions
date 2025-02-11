import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NoNavbar from "@/src/layouts/no-navbar";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", values)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          router.push("/admin");
        }
      })
      .catch((err) => {
        setError("Wrong password");
        console.log(err);
      });
  };

  return (
    <NoNavbar>
      <div className="login">
        <div className="wrapper">
          <div className="text-danger">{error}</div>
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
