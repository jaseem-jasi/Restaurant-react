import React from "react";
import RotatingText from "./RotatingText";
import "./RotatingText.css";

const Rotating = () => {
  return (
    <div className="App">
      <p>Hello</p>
      <RotatingText
        mainClassName="text"
        texts={["React", "Animations", "Are", "Smooth!"]}
        rotationInterval={2000}
      />
    </div>
  );
};

export default Rotating;
