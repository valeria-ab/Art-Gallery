import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./style.scss";
import arrow from "../../assets/photoItem/arrow.png";
import { themes } from "../../contexts/ThemeContext";
import { NoImage } from "./NoImage/NoImage";

const cx = classNames.bind(style);

type PhotoItemForArtistsPropsType = {
  name: string;
  years: string;
  picture: string;
  id: string;
  theme: string;
};
export const PhotoItemForArtists = ({
  name,
  id,
  years,
  picture,
  theme,
}: PhotoItemForArtistsPropsType) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cx("photoItem__container", {
        "photoItem__container-active": hover,
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <NavLink to={`/artists/${id}`} className={cx("photoItem")}>
        {picture === "no image" ? (
          <NoImage theme={theme} />
        ) : (
          <img
            className={cx("photoItem__img", {
              "photoItem__img-active": hover,
            })}
            src={`${process.env.REACT_APP_BASE_URL}${picture}`}
            alt="mainPicture"
          />
        )}
        <div
          className={cx("hoverButton", {
            "hoverButton-show": hover,
            hoverButton__dark: theme === themes.dark,
            hoverButton__light: theme === themes.light,
          })}
        >
          <span
            className={cx("hoverButtonSpan", {
              hoverButtonSpan__dark: theme === themes.dark,
              hoverButtonSpan__light: theme === themes.light,
            })}
          >
            Learn more
          </span>
        </div>
        <div className={cx("titleContainer", `titleContainer_${theme}`)}>
          <div className={cx("titleBlock", `titleBlock_${theme}`)}>
            <div className={cx("name", `name_${theme}`)}>{name}</div>
            <div className={cx("years", `years_${theme}`)}>{years}</div>
          </div>
          <div className={cx("learnMore_mobile", `learnMore_mobile_${theme}`)}>
            <img src={arrow} alt="arrow" width="16px" height="10px" />
          </div>
        </div>
      </NavLink>
    </div>
  );
};
