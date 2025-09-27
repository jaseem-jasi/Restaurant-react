import React, { useEffect, useState } from "react";
import "./Menu.css";
import MandhiSelector from "./MandhiSelector";

export default function Menu({ addToCart }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.foods);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }

  return (
    <section className="menu">
      <MandhiSelector addToCart={addToCart} />
      <div className="food-list">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.image} alt={food.name} />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <span>Rs:{food.price.toFixed(2)}</span>
              <button className="add-btn" onClick={() => addToCart(food)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
