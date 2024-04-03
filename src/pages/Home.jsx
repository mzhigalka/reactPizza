import React from "react";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
// import Pagination from "../components/Pagination";

import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategoryId, setFilters } from "../store/slices/filterSlice";
import { fetchItems } from "../store/slices/itemsSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { items, status } = useSelector((state) => state.itemsSlice);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue } = React.useContext(AppContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getItems = async () => {
    dispatch(
      fetchItems({
        categoryId,
        sortType,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если параметри и первый рендер изменились
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType]);

  // Первый рендер, проверка URL-параметров и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый ренде, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }

    isSearch.current = false;
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
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default Home;
