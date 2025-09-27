import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ active, cart }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    const section = document.getElementById(id);
    const container = document.querySelector(".horizontal-scroll");
    if (section && container) {
      container.scrollTo({ left: section.offsetLeft, behavior: "smooth" });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a
              href="#main"
              className={active === "main" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleClick("main");
              }}
            >
              Main
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className={active === "menu" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleClick("menu");
              }}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={active === "contact" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleClick("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Floating cart icon */}
      <div className="floating-cart" onClick={() => navigate("/cart")}>
        🛒
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
    </>
  );
}
