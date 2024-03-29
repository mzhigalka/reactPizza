import React from "react";

export default function Categories({ value, onClickCategory }) {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
