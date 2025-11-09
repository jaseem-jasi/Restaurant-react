import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({ cart, updateQty, removeFromCart, showMenuButton }) {
  const navigate = useNavigate();

  // ✅ Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      className="cart-page"
      onWheel={(e) => e.stopPropagation()} // Stop horizontal scroll from MainPage
    >
      {showMenuButton && (
        <button
          className="menu-btn"
          onClick={() => window.location.href = "/"}
        >
          ← Main
        </button>
      )}

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* ✅ Render rice + chicken stacked */}
                <div className="cart-item-images">
                  {Array.isArray(item.image) ? (
                    item.image.map((img, idx) => (
                      <img key={idx} src={img} alt={`${item.name}-${idx}`} />
                    ))
                  ) : (
                    <img src={item.image} alt={item.name} />
                  )}
                </div>

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Rs:{item.price.toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total Section */}
          <div className="cart-total">
            <h3>Total: {total.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
