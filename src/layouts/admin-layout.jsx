/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/src/components/Side-Bar/sidebar";

function AdminLayout({ children }) {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/admin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
          console.log(res.data);
        }
      })
      .catch((err) => {
        // router.push("/admin");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  //   if (!isLoggedIn) {
  //     return <p>error</p>; // Render error if user is not an admin
  //   }

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
