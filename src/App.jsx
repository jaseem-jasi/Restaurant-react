import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Menu from "./Menu";
import Cart from "./Cart";
import AboutUs from "./AboutUs";

function MainPage({ cart, addToCart }) {
  const [active, setActive] = useState("main");

  useEffect(() => {
    const container = document.querySelector(".horizontal-scroll");
    const sections = document.querySelectorAll(".h-section");

    const onWheel = (e) => {
      const activeSection = [...sections].find(
        (sec) =>
          Math.abs(sec.offsetLeft - container.scrollLeft) < 10
      );
      if (!activeSection) return;

      const maxScroll = activeSection.scrollHeight - activeSection.clientHeight;

      
      const atTop = activeSection.scrollTop <= 0;
      const atBottom = activeSection.scrollTop >= maxScroll - 2;

      if (e.deltaY > 0) {
        // scrolling down
        if (!atBottom) {
          return; 
        }
      } else {
        // scrolling up
        if (!atTop) {
          return; 
        }
      }

      e.preventDefault();
      container.scrollTo({
        left:
          container.scrollLeft +
          (e.deltaY > 0 ? window.innerWidth : -window.innerWidth),
        behavior: "smooth",
      });
    };

    if (container) {
      container.addEventListener("wheel", onWheel, { passive: false });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      if (container) container.removeEventListener("wheel", onWheel);
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
        <AboutUs/>          
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
