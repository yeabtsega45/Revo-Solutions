import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/src/components/Side-Bar/sidebar";

function Admin({ children }) {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("token");
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
        router.push("/login");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!isLoggedIn) {
    return null; // Render nothing if user is not an admin
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <h4>Admin Page</h4>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Admin;
