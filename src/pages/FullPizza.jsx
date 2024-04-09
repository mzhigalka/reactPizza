import React from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://f4e78433cae02a7d.mokky.dev/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы !");
        console.warn(error);
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "";
  }

  return (
    <div className="container full--pizza">
      <img src={pizza.imageUrl} width={400} height={400} alt="Pizza" />
      <div className="full--pizza__content">
        <h2>{pizza.title}</h2>
        <p>{pizza.description}</p>
        <h4>{pizza.price} ₽</h4>
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
