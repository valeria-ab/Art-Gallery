import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import arrow from "../../assets/photoItem/arrow.png";
import cogwheel from "../../assets/photoItem/cogwheel.png";
import { themes } from "../../contexts/ThemeContext";
import {
  setCurrentPainting,
  updateMainPaintingTC,
} from "../../store/artistPage-reducer";
import { AppDispatch, IAppStore } from "../../store/store";
import { AuthorPaintingsType } from "../../utils/api";
import { NoImagePlug } from "../ArtistPage/ArtistProfile/ArtistProfile";
import style from "./style.scss";

const cx = classNames.bind(style);

type PhotoItemPropsType = {
  name: string;
  years: string;
  picture: string;
  id: string;
  theme: string;
  onDeletePictureClick?: (paintingId: string) => void;
  onEditPictureClick?: (mode: "edit" | "add") => void;
  setPaintingId?: (id: string) => void;
  pictureData?: AuthorPaintingsType;
  isMobileMode: boolean;
};

const PhotoItem = ({
  name,
  id,
  years,
  picture,
  theme,
  onDeletePictureClick,
  onEditPictureClick,
  pictureData,
  setPaintingId,
  isMobileMode,
}: PhotoItemPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();

  const [hover, setHover] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  const isLoggedIn = useSelector<IAppStore, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const onEditPainting = () => {
    if (pictureData)
      dispatch(setCurrentPainting({ currentPainting: pictureData }));
    if (onEditPictureClick) onEditPictureClick("edit");
  };

  return (
    <div
      role="presentation"
      className={cx("photoItem__container")}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setMenuOpened(false);
      }}
    >
      {isLoggedIn && (
        <>
          <div
            className={cx("displayNone", {
              displayBlock: isMobileMode || hover,
            })}
          >
            <div
              role="presentation"
              tabIndex={-1}
              className={cx({
                settings__hover: isMobileMode || hover,
              })}
              onClick={() => setMenuOpened(!isMenuOpened)}
            >
              <img src={cogwheel} alt="cogwheel" width="24px" height="24px" />
            </div>
            <div
              className={cx("displayNone", {
                settings__menu: isMenuOpened,
                settings__menu_light: theme === themes.light,
                settings__menu_dark: theme === themes.dark,
              })}
            >
              <div
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="presentation"
                tabIndex={-1}
                onClick={() => {
                  if (authorId) dispatch(updateMainPaintingTC(id, authorId));
                }}
              >
                Make the cover
              </div>
              <div
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="presentation"
                tabIndex={-1}
                onClick={onEditPainting}
              >
                Edit
              </div>
              <div
                role="presentation"
                tabIndex={-1}
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                onClick={() => onDeletePictureClick && onDeletePictureClick(id)}
              >
                Delete
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={cx("photoItem")}
        role="presentation"
        onClick={() => {
          setPaintingId && setPaintingId(id);
        }}
      >
        {picture !== "no image" ? (
          <img
            className={cx("photoItem__img")}
            src={`${process.env.REACT_APP_BASE_URL}${picture}`}
            alt="mainPicture"
          />
        ) : (
          <NoImagePlug theme={theme} />
        )}

        <div className={cx("titleContainer", `titleContainer_${theme}`)}>
          <div className={cx("titleBlock", `titleBlock_${theme}`)}>
            <div className={cx("name", `name_${theme}`)}>{name}</div>
            <div className={cx("years", `years_${theme}`)}>{years}</div>
          </div>
          <div className={cx("learnMore_mobile", `learnMore_mobile_${theme}`)}>
            <img src={arrow} alt="arrow" width="16px" height="10px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
