import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import settingsIconDark from "../../assets/mainPageFilters/settingsIconDark.png";
import settingsIconLight from "../../assets/mainPageFilters/settingsIconLight.png";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  getArtistsStaticTC,
  getArtistsTC,
  InitialGalleryStateType,
  setCurrentPage,
  setUrlParams,
} from "../../store/gallery-reducer";
import { AppDispatch, IAppStore } from "../../store/store";
import { AddEditArtist } from "../ArtistPage/AddEditArtist/AddEditArtist";
import { Button } from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import { FilterInput } from "./FilterInput/FilterInput";
import { FiltersMenu } from "./FiltersMenu/FiltersMenu";
import style from "./style.scss";

const cx = classNames.bind(style);

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoggedIn = useSelector<IAppStore, boolean>(
    (state) => state.auth.isLoggedIn,
    shallowEqual
  );
  const { portionSize, currentPage, artists } = useSelector<
    IAppStore,
    InitialGalleryStateType
  >((state) => state.gallery);
  const error = useSelector<IAppStore, string>((state) => state.app.error);
  const successMessage = useSelector<IAppStore, string>(
    (state) => state.app.successMessage
  );

  const [isAddArtistMode, setAddArtistMode] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);
  const [isSettingsMode, setSettingsMode] = useState(false);

  const artistsStaticCurrentPortion = artists.slice(
    0,
    portionSize * currentPage
  );

  const onLoadMore = () => {
    dispatch(setCurrentPage({ currentPage: currentPage + 1 }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getArtistsTC());
    }
  }, [isLoggedIn, currentPage]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setUrlParams({ urlParams: Object.fromEntries(searchParams) }));
      dispatch(getArtistsTC());
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getArtistsStaticTC());
    }
  }, [isLoggedIn]);


  function displayWindowSize() {
    const w = document.documentElement.clientWidth;
    window.addEventListener("resize", displayWindowSize);
    if (w > 768 && isMobileMode) {
      setIsMobileMode(false);
    }
    if (w <= 768 && !isMobileMode) {
      setIsMobileMode(true);
    }
  }

  displayWindowSize();

  if (isMobileMode && isAddArtistMode) {
    return (
      <AddEditArtist
        onCancelCallback={setAddArtistMode}
        mode="add"
        isMobileMode={isMobileMode}
      />
    );
  }

  return (
    <>
      {isAddArtistMode && (
        <AddEditArtist
          onCancelCallback={setAddArtistMode}
          mode="add"
          isMobileMode={isMobileMode}
        />
      )}
      {isLoggedIn && (
        <div className={cx("buttons_wrapper")}>
          <Button
            value="add artist"
            type="add"
            theme={theme}
            width="100px"
            callback={() => setAddArtistMode(true)}
          />
          <div className={cx("filterButtons_wrapper")}>
            <div className={cx("filterInput_wrapper")}>
              <FilterInput />
            </div>
            <div className={cx("settingsIcon")}>
              <button
                className={cx("filter_buttons")}
                type="button"
                onClick={() => {
                  setSettingsMode(!isSettingsMode);
                }}
              >
                <img
                  src={theme === "light" ? settingsIconLight : settingsIconDark}
                  alt="settingsIconLight"
                  width="16px"
                  height="13px"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {isSettingsMode && (
        <FiltersMenu
          theme={theme}
          isSettingsMode={isSettingsMode}
          setSettingsMode={setSettingsMode}
        />
      )}
      <Gallery
        artists={isLoggedIn ? artists : artistsStaticCurrentPortion}
        onLoadMore={onLoadMore}
        isMobileMode={isMobileMode}
      />

      {(error || successMessage) && <ToastMessage />}
    </>
  );
};

export default MainPage;
