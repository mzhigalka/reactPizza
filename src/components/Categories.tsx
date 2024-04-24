import { FC } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];

const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
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
};

export default Categories;
