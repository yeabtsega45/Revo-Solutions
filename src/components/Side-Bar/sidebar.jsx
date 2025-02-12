import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="">Houses</Link>
        </li>
        <li>
          <Link to="/admin/cars">Cars</Link>
        </li>
        <li>
          <Link to="/admin/lands">Lands</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
