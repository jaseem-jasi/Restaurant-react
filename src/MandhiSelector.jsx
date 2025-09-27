import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./mandhiSelector.css";

export default function MandhiSelector({ addToCart }) {
  const [piece, setPiece] = useState("full");

  const pieces = {
    full: {
      img: "/full.png",
      name: "Full Chicken Mandhi",
      description: "Juicy whole chicken served with fragrant rice and signature spices.",
      price: 780
    },
    half: {
      img: "/half.png",
      name: "Half Chicken Mandhi",
      description: "Perfect half portion of our signature chicken mandhi.",
      price: 400
    },
    quarter: {
      img: "/quarter.png",
      name: "Quarter Chicken Mandhi",
      description: "Light meal with a quarter chicken and delicious rice.",
      price: 210
    }
  };

  const variants = {
    enter: { x: 200, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -200, opacity: 0 }
  };

  return (
    <div className="container">
      <p className="head">Our Signature Mandhi</p>
      <div className="main-mandhi-container">
        {/* Chicken + rice preview */}
        <div className="mandhi-container">
          <img src="/rice.png" alt="Mandhi rice" className="rice-bg" />
          <div className="chicken-wrapper">
            <AnimatePresence mode="wait">
              <motion.img
                key={piece}
                src={pieces[piece].img}
                alt={pieces[piece].name}
                className={`chicken-piece ${piece}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Food details */}
        <div className="food-details">
          <h2>{pieces[piece].name}</h2>
          <p>{pieces[piece].description}</p>
          <p><strong>Cost:</strong> {pieces[piece].price}</p>

          {/* Switch buttons */}
          <div className="controls">
            {["full", "half", "quarter"].map((p) => (
              <button key={p} onClick={() => setPiece(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* ✅ Add rice + chicken to cart */}
          <button
            className="order-btn"
            onClick={() =>
              addToCart({
                id: piece,
                name: pieces[piece].name,
                image: ["/rice.png", pieces[piece].img],
                price: pieces[piece].price
              })
            }
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
