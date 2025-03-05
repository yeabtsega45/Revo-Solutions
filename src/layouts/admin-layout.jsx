/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/src/components/Side-Bar/sidebar";
import ErrorScreen from "../components/Error-Screen/error-screen";
import LoadingScreen from "../components/Loading-Screen/loading-screen";
import { useRouter } from "next/router";

function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  axios.defaults.withCredentials = true;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user/admin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsLoggedIn(true);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data.message);
        router.push("/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // // Render error if user is not an admin
  // if (!isLoggedIn) {
  //   return <ErrorScreen error={error} />;
  // }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <h4>Revo Solutions</h4>
          {children}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
