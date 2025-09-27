import React from "react";
import "./Hero.css";

export default function Hero({ id }) {
  return (
    <section id={id} className="hero">
      <div className="hero-content">
        <h2>Order Your <br/>Favourite food here</h2>
        <h3>Where Every Bite Tells a Story</h3>
        <p>Discover a world of flavors crafted with passion and served with love.  
          From sizzling grills to mouth-watering desserts, our chefs bring you the
          perfect blend of tradition and taste. Whether it’s a casual dinner or a
          special celebration, we’re here to make it unforgettable.</p>
        <a href="#menu" className="btn">Explore Menu</a>
      </div>
    </section>
  );
}
