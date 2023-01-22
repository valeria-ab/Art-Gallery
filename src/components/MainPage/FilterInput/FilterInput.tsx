import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import useDebounce from "../../../hooks/useDebounce";
import { setCurrentPage, UrlParamsType } from "../../../store/gallery-reducer";
import { AppDispatch, IAppStore } from "../../../store/store";
import cancelDarkMode from "../../../assets/mainPageFilters/cancelDarkMode.png";
import cancelLightMode from "../../../assets/mainPageFilters/cancelLightMode.png";
import searchIconLight from "../../../assets/mainPageFilters/searchIconLight.png";

import style from "./style.scss";

const cx = classNames.bind(style);

export const FilterInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [name, setName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const prevParams = Object.fromEntries(searchParams);
  const urlParams = useSelector<IAppStore, UrlParamsType>(
    (state) => state.gallery.urlParams
  );
  const currentPage  = useSelector<
  IAppStore, number
>(({gallery}) => gallery.currentPage);

  const onEnterPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.charCode === 13) {
      setSearchParams({ ...prevParams, name });
    }
  };

  const onKeyUpHandler = useDebounce(() => {
    if (name) {
    (currentPage !== 1) && dispatch(setCurrentPage({currentPage: 1}))
      setSearchParams({ ...prevParams, name });
    } else {
      delete prevParams.name;
      setSearchParams({ ...prevParams });
    }
  }, 1000);

  useEffect(() => {
    if (urlParams.name) setName(urlParams.name);
    return () => {
      setName("");
    };
  }, [urlParams.name]);

  return (
    <div className={cx("searchContainer", `searchContainer_${theme}`)}>
      <div
        className={cx("searchIconContainer", `searchIconContainer_${theme}`)}
      >
        <img
          src={searchIconLight}
          alt="searchIcon"
          className={cx("searchIcon")}
        />
      </div>
      <input
        className={cx(
          "searchContainer_input",
          `searchContainer_input_${theme}`
        )}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        onKeyUp={onKeyUpHandler}
        onKeyPress={onEnterPressHandler}
        placeholder="Search"
        value={name}
      />
      {name && (
        <button
          type="button"
          onClick={() => {
            setName("");
            delete prevParams.name;
            setSearchParams({ ...prevParams });
          }}
        >
          <img
            src={theme === "light" ? cancelLightMode : cancelDarkMode}
            alt="clearInput"
            width="8px"
            height="8px"
          />
        </button>
      )}
    </div>
  );
};
