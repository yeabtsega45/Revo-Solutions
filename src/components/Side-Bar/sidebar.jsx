import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const isActiveLink = (path) => {
    return router.pathname === path ? "active" : "";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Revo Solutions</h2>
      </div>
      <ul className="nav-links">
        <li className={isActiveLink("/admin")}>
          <Link href="">Works</Link>
        </li>
        <li>
          <Link href="/admin/analytics">Analytics</Link>
        </li>
        <li>
          <Link href="/admin/user">User Info</Link>
        </li>
        <li onClick={handleLogout}>
          <Link href="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
