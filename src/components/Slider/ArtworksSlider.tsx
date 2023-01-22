import classNames from "classnames/bind";
import { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppDispatch, IAppStore } from "../../store/store";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import cancel from "../../assets/slider/cancel.png";
import deleteIconDark from "../../assets/slider/deleteIconDark.png";
import deleteIconLight from "../../assets/slider/deleteIconLight.png";
import editIconDark from "../../assets/slider/editIconDark.png";
import editIconLight from "../../assets/slider/editIconLight.png";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import {
  setCurrentPainting,
  updateMainPaintingTC,
} from "../../store/artistPage-reducer";
import { AuthorPaintingsType } from "../../utils/api";
import { Button } from "../Button/Button";
import style from "./style.scss";

const cn = classNames.bind(style);

type SliderPropsType = {
  setPaintingId: (value: string) => void;
  setSliderVisible: (value: boolean) => void;
  onAddEditPictureClick: (mode: "edit" | "add") => void;
  onDeletePictureClick: (pictureId: string) => void;
  currentIndex: number | null;
};

const ArtworksSlider: FC<SliderPropsType> = ({
  setPaintingId,
  setSliderVisible,
  onDeletePictureClick,
  onAddEditPictureClick,
  currentIndex,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authorId } = useParams();
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings
  );
  const mainPainting = useSelector<IAppStore, string>(
    ({ artistPage }) => artistPage.artistInfo.mainPainting._id
  );

  const isLoggedIn = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isLoggedIn
  );

  const onEditPainting = (pictureData: AuthorPaintingsType) => {
    dispatch(setCurrentPainting({ currentPainting: pictureData }));
    if (onAddEditPictureClick) {
      onAddEditPictureClick("edit");
    }
  };


  const onMakeTheCoverClick = (id: string) =>
    authorId && dispatch(updateMainPaintingTC(id, authorId));


  useEffect(() => {
    return () => {
      setPaintingId("");
    };
  }, []);

  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          currentIndex != null && swiper.slideTo(currentIndex, 0, false);
        }}
      >
        {artworks?.map((artwork) => (
          <SwiperSlide key={artwork._id}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${artwork.image?.src2x}`}
              alt="image1"
            />

            <div className={cn("canselButton")}>
              <button type="button" onClick={() => setSliderVisible(false)}>
                <span>
                  <img src={cancel} height="16px" width="16px" alt="cancel" />
                </span>
              </button>
            </div>
            {isLoggedIn && mainPainting !== artwork._id && (
              <div className={cn("makeTheCover")}>
                  <Button
                    value="make the cover"
                    type="outlined"
                    theme={themes.dark}
                    width="200px"
                    callback={() => onMakeTheCoverClick(artwork._id)}
                  />
              
              </div>
            )}
            <div className={cn("infoBlock", `infoBlock_${theme}`)}>
              {isLoggedIn && (
                <div className={cn("iconsBlockContainer")}>
                  <div className={cn("iconsBlock")}>
                    <button
                      type="button"
                      className={cn("iconsBlock_iconButton")}
                      onClick={() => onEditPainting(artwork)}
                    >
                      <img
                        src={
                          theme === themes.light ? editIconLight : editIconDark
                        }
                        alt="edit"
                        width="16px"
                        height="16px"
                      />
                    </button>
                    <button
                      type="button"
                      className={cn("iconsBlock_iconButton")}
                      onClick={() => onDeletePictureClick(artwork._id)}
                    >
                      <img
                        src={
                          theme === themes.light
                            ? deleteIconLight
                            : deleteIconDark
                        }
                        alt="delete"
                        width="16px"
                        height="16px"
                      />
                    </button>
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "infoBlockContainer",
                  `infoBlockContainer_${theme}`
                )}
              >
                <div className={cn("year", `year_${theme}`)}>
                  {artwork.yearOfCreation}
                </div>
                <div className={cn("name", `name_${theme}`)}>
                  {artwork.name}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ArtworksSlider;
