import React, { FC } from "react";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
// import Pagination from "../components/Pagination";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategoryId, setFilters } from "../store/filter/slice";

import { useAppDispatch } from "../store/store";
import { selectFilter } from "../store/filter/selectors";
import { selectItems } from "../store/items/selectors";
import { fetchItems } from "../store/items/asyncActions";
import { FetchItemsArgs } from "../store/items/types";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    categoryId,
    sort: { sortProperty: sortType },
    searchValue,
  } = useSelector(selectFilter);

  const { items, status } = useSelector(selectItems);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const getItems = async () => {
    const search = searchValue;
    dispatch(
      fetchItems({
        categoryId,
        sortType,
        search,
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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchItemsArgs;
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: params.categoryId,
          sort: sort || list[0],
        })
      );

      isMounted.current = true;
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
          .filter((obj: any) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
              return true;
            }
            return false;
          })
          .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
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
              попытку позже.А
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
