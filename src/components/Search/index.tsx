import React, { FC } from "react";
import styles from "./Search.module.scss";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../store/slices/filterSlice";

const Search: FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        type="text"
        value={value}
      />
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
