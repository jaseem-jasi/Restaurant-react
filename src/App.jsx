import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Menu from "./Menu";
import Cart from "./Cart";
import AboutUs from "./AboutUs";

function MainPage({ cart, addToCart }) {
  const [active, setActive] = useState("main");
  const touchStartRef = useRef(0);

  useEffect(() => {
    const container = document.querySelector(".horizontal-scroll");
    const sections = document.querySelectorAll(".h-section");

    // Mouse wheel (desktop)
    const onWheel = (e) => {
      const activeSection = [...sections].find(
        (sec) => Math.abs(sec.offsetLeft - container.scrollLeft) < 10
      );
      if (!activeSection) return;

      const maxScroll = activeSection.scrollHeight - activeSection.clientHeight;
      const atTop = activeSection.scrollTop <= 0;
      const atBottom = activeSection.scrollTop >= maxScroll - 2;

      if (e.deltaY > 0) {
        if (!atBottom) return;
      } else {
        if (!atTop) return;
      }

      e.preventDefault();
      container.scrollTo({
        left: container.scrollLeft + (e.deltaY > 0 ? window.innerWidth : -window.innerWidth),
        behavior: "smooth",
      });
    };

    // Touch (mobile swipe)
    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStartRef.current - touchEnd;

      const activeSection = [...sections].find(
        (sec) => Math.abs(sec.offsetLeft - container.scrollLeft) < 10
      );
      if (!activeSection) return;

      if (diff > 50) {
        const next = activeSection.nextElementSibling;
        if (next) container.scrollTo({ left: next.offsetLeft, behavior: "smooth" });
      } else if (diff < -50) {
        const prev = activeSection.previousElementSibling;
        if (prev) container.scrollTo({ left: prev.offsetLeft, behavior: "smooth" });
      }
    };

    if (container) {
      container.addEventListener("wheel", onWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: false });
      container.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    // Observe active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      if (container) {
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar active={active} cart={cart} />
      <div className="horizontal-scroll">
        <section id="main" className="h-section">
          <Hero />
        </section>
        <section id="menu" className="h-section">
          <Menu addToCart={addToCart} />
        </section>
        <section id="contact" className="h-section">
          <AboutUs />
        </section>
      </div>
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainPage cart={cart} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              showMenuButton={true}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
