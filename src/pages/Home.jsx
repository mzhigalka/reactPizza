import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);

  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://f4e78433cae02a7d.mokky.dev/items?${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas =
    items.length > 0
      ? items
          .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
              return true;
            }
            return false;
          })
          .map((obj) => <PizzaBlock key={obj.id} {...obj} />)
      : [];

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <div className="content__bottom">
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
      <Pagination />
    </>
  );
};

export default Home;
