import React from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const params = useParams();

  return (
    <div className="container">
      <img src="" alt="Pizza" />
      <h2>222</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cum
        nam, laboriosam sed quae obcaecati.
      </p>
      <h4>111</h4>
    </div>
  );
};

export default FullPizza;
