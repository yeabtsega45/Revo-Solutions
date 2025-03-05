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
          <Link href="/admin">Edit Works</Link>
        </li>
        <li className={isActiveLink("/admin/create")}>
          <Link href="/admin/create">Create Work</Link>
        </li>
        <li className={isActiveLink("/admin/reorder")}>
          <Link href="/admin/reorder">Reorder Works</Link>
        </li>
        <li className={isActiveLink("/admin/analytics")}>
          <Link href="/admin/analytics">Analytics</Link>
        </li>
        <li onClick={handleLogout}>
          <Link href="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
