import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./style.scss";
import eye from "../../assets/modals/authorization/eye.png";
import { ThemeContext } from "../../contexts/ThemeContext";
import useDebounce from "../../hooks/useDebounce";

const cx = classNames.bind(style);

type InputPropsType = {
  label: string;
  type: string;
  callback: (value: string) => void;
  value?: string;
  blurHandler?: () => void;
  error: string | null;
  width?: string;
  propsValue?: string;
};

export const Input = ({
  label,
  type,
  callback,
  blurHandler,
  error,
  width,
  propsValue,
}: InputPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState(false);
  const [value, setValue] = useState(propsValue || "");

  const onKeyUp = useDebounce(() => callback(value), 500);

  return (
    <div className={cx("inputContainer")}>
      <div className={cx({ passwordInput: type === "password" })}>
        <label htmlFor="">
          <div className={cx("label")}>{label} </div>
          <input
            className={cx("input", {
              input__light: theme === "light",
              input__dark: theme === "dark",
            })}
            style={{ width }}
            type={viewMode ? "text" : type}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={blurHandler}
            onKeyUp={onKeyUp}
          />
          {error !== null && <div className={cx("errorMessage")}>{error}</div>}
          {type === "password" && (
            <span onClick={() => setViewMode(!viewMode)} role="button">
              <img className={cx("view")} src={eye} alt="eye" />
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
