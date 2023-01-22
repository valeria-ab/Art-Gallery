import classNames from "classnames/bind";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { themes } from "../../../contexts/ThemeContext";
import {
  getGenresStaticTC,
  getGenresTC,
  InitialGalleryStateType,
  setCurrentPage,
} from "../../../store/gallery-reducer";
import { AppDispatch, IAppStore } from "../../../store/store";
import cancelDarkMode from "../../../assets/mainPageFilters/cancelDarkMode.png";
import cancelLightMode from "../../../assets/mainPageFilters/cancelLightMode.png";
import plusIconDark from "../../../assets/mainPageFilters/plusIconDark.png";
import plusIconLight from "../../../assets/mainPageFilters/plusIconLight.png";
import { Button } from "../../Button/Button";
import style from "./style.scss";

const cx = classNames.bind(style);

type FiltersMenuPropsType = {
  theme: string;
  isSettingsMode: boolean;
  setSettingsMode: (value: boolean) => void;
};

export const FiltersMenu: FC<FiltersMenuPropsType> = ({
  theme,
  isSettingsMode,
  setSettingsMode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const prevParams = Object.fromEntries(searchParams);
  const [isGenresFiltersOpened, setGenresFiltersOpened] = useState(false);
  const [isSortByFiltersOpened, setSortByFiltersOpened] = useState(false);
  const [chosenGenres, setChosenGenres] = useState<string[]>(
    Array.from(searchParams.getAll("genres"))
  );
  const [order, setOrder] = useState<string | null>(
    searchParams.get("orderBy")
  );
  const isLoggedIn = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isLoggedIn
  );
  const { genres } = useSelector<IAppStore, InitialGalleryStateType>(
    (state) => state.gallery
  );
  const currentPage = useSelector<IAppStore, number>(
    ({ gallery }) => gallery.currentPage
  );

  const onShowResults = () => {
    currentPage !== 1 && dispatch(setCurrentPage({ currentPage: 1 }));
    if (order) {
      setSearchParams({
        ...prevParams,
        sortBy: "name",
        orderBy: order,
        genres: chosenGenres,
      });
    } else {
      delete prevParams.sortBy;
      delete prevParams.orderBy;
      setSearchParams({
        ...prevParams,
        genres: chosenGenres,
      });
    }
    setSettingsMode(false);
  };
  const onClear = () => {
    currentPage !== 1 && dispatch(setCurrentPage({ currentPage: 1 }));
    setChosenGenres([]);
    setOrder(null);
    setSearchParams({});
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getGenresTC());
    } else {
      dispatch(getGenresStaticTC());
    }
  }, [isLoggedIn]);

  return (
    <div className={cx("filtersMenu", `filtersMenu_${theme}`)}>
      <button
        style={{ float: "right" }}
        className={cx("filter_buttons")}
        type="button"
        onClick={() => setSettingsMode(!isSettingsMode)}
      >
        <img
          width="16px"
          height="16px"
          src={theme === themes.light ? cancelLightMode : cancelDarkMode}
          alt="cancel"
        />
      </button>

      <div className={cx("filters_block")}>
        <div>
          <div className={cx("filter_title_buttons_wrapper")}>
            <button
              type="button"
              className={cx(
                "filter_title_button",
                "filter_buttons",
                `filter_title_button_${theme}`
              )}
              onClick={() => setGenresFiltersOpened(!isGenresFiltersOpened)}
            >
              GENRES
              {chosenGenres.length > 0 && <span>({chosenGenres.length})</span>}
            </button>
            <button
              className={cx("filter_buttons")}
              type="button"
              onClick={() => setGenresFiltersOpened(!isGenresFiltersOpened)}
            >
              <img
                width="16px"
                height="16px"
                src={theme === themes.light ? plusIconLight : plusIconDark}
                alt="openGenres"
              />
            </button>
          </div>
          {isGenresFiltersOpened && (
            <div className={cx("genresList")}>
              {genres.map((genre) => (
                <button
                  type="button"
                  className={cx("filter_genreItem", {
                    filter_genreItem_dark: theme === "dark",
                    filter_genreItem_dark_chosen:
                      !!chosenGenres.find((cg) => cg === genre._id) &&
                      theme === "dark",
                    filter_genreItem_light_chosen:
                      !!chosenGenres.find((cg) => cg === genre._id) &&
                      theme === "light",
                    filter_genreItem_light: theme === "light",
                  })}
                  key={genre._id}
                  onClick={() => {
                    if (chosenGenres.find((cg) => cg === genre._id)) {
                      setChosenGenres(
                        chosenGenres.filter((cg) => cg !== genre._id)
                      );
                    } else {
                      setChosenGenres([...chosenGenres, genre._id]);
                    }
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}

          <div className={cx("filter_title_container")}>
            <div className={cx("filter_title_buttons_wrapper")}>
              <button
                className={cx("filter_title_button", "filter_buttons", {
                  filter_title_button_light: theme === "light",
                  filter_title_button_dark: theme === "dark",
                })}
                onClick={() => setSortByFiltersOpened(!isSortByFiltersOpened)}
                type="button"
              >
                SORT BY
                {order && <span>({order === "asc" ? "a-z" : "z-a"})</span>}
              </button>
              <button
                className={cx("filter_buttons")}
                type="button"
                onClick={() => setSortByFiltersOpened(!isSortByFiltersOpened)}
              >
                <img
                  width="16px"
                  height="16px"
                  src={theme === themes.light ? plusIconLight : plusIconDark}
                  alt="openSortBy"
                />
              </button>
            </div>
            <>
              {isSortByFiltersOpened && (
                <div className={cx()}>
                  <button
                    className={cx(
                      "filter_buttons",
                      "filter_genreItem",
                      "sortByButtons",
                      {
                        filter_genreItem_light_chosen:
                          order === "desc" && theme === "light",
                        filter_genreItem_dark_chosen:
                          order === "desc" && theme === "dark",
                        inherit: order !== "desc",
                        filter_genreItem_light: theme === "light",
                        filter_genreItem_dark: theme === "dark",
                      }
                    )}
                    type="button"
                    onClick={() => setOrder("desc")}
                  >
                    Z-A
                  </button>
                  <div>
                    <button
                      className={cx(
                        "filter_buttons",
                        "filter_genreItem",
                        "sortByButtons",
                        {
                          filter_genreItem_light_chosen:
                            order === "asc" && theme === "light",
                          filter_genreItem_dark_chosen:
                            order === "asc" && theme === "dark",
                          inherit: order !== "asc",
                          filter_genreItem_light: theme === "light",
                          filter_genreItem_dark: theme === "dark",
                        }
                      )}
                      type="button"
                      onClick={() => setOrder("asc")}
                    >
                      A-Z
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>

        <div className={cx("bottomButtonsBlock")}>
          <Button
            value="Show the results"
            type="outlined"
            theme={theme}
            callback={onShowResults}
          />
          <Button
            value="Clear"
            type="outlined"
            theme={theme}
            callback={onClear}
          />
        </div>
      </div>
    </div>
  );
};
