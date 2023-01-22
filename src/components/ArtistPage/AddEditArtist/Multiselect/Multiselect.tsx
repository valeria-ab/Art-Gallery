import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./style.scss";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { GenreForMultiselect } from "../../Genre/Genre";
import { GenreResponseType } from "../../../../utils/api";

const cx = classNames.bind(style);
type PropsType = {
  genres: GenreResponseType[];
  selectedGenres: Array<GenreResponseType>;
  onGenreClick: (genre: GenreResponseType) => void;
};
export const Multiselect = ({
  genres,
  onGenreClick,
  selectedGenres,
}: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className={cx("label", {
          label__light: theme === "light",
          label__dark: theme === "dark",
        })}
      >
        Genres*
      </div>
      <div className={cx("multiselect")}>
        <div
          className={cx("select__header", {
            input__light: theme === "light",
            input__dark: theme === "dark",
            select__header__focus__light: isOpen && theme === "light",
            select__header__focus__dark: isOpen && theme === "dark",
          })}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
        >
          <div className={cx("genres")}>
            {selectedGenres.map((g) => (
              <span
                key={g._id}
                role="definition"
                onClick={() => onGenreClick(g)}
              >
                <GenreForMultiselect value={`${g.name} x`} />
              </span>
            ))}
          </div>
          <div
            className={cx("select__icon")}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
          >
            &#9660;
          </div>
        </div>
        <div
          className={cx("selectBody", {
            selectBody__opened: isOpen,
            selectBody__light: theme === "light",
            selectBody__dark: theme === "dark",
          })}
        >
          {genres.map((g, index) => (
            <div
              key={g._id}
              className={cx("select__item", {
                select__item__light: theme === "light",
                select__item__dark: theme === "dark",
              })}
            >
              <input
                className={cx("custom-checkbox")}
                type="checkbox"
                id={`checkbox + ${index}`}
                onClick={() => onGenreClick(g)}
                checked={!!selectedGenres.find((sg) => sg._id === g._id)}
              />
              <label htmlFor={`checkbox + ${index}`}>
                {" "}
                <div>{g.name}</div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
