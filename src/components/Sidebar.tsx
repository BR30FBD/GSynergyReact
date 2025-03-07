import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu toggle
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="mobile-navbar">
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />} GSynergy
        </button>
      </div>

      {/* Sidebar / Drawer */}
      <aside className={`sidebar ${isOpen ? "open" : ""} zindex`}>
        <div className="logo">GSynergy</div>
        <ul className="nav-links">
          <li>
          <Link to="/stores">🏠 Store</Link>
          </li>
          <li>
          <Link to="/skus">📦 SKUs</Link>
          </li>
          <li>
          <Link to="/planning">📅 Planning</Link>
          </li>
          <li>
          <Link to="/chart">⚙️ Settings</Link>
          </li>
        </ul>
      </aside>

      {/* Overlay for Mobile Drawer */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
