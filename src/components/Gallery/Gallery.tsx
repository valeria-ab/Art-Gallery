import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { AppDispatch, IAppStore } from "../../store/store";
import { ArtistResponseType, AuthorPaintingsType } from "../../utils/api";
import { ThemeContext } from "../../contexts/ThemeContext";
import style from "./style.scss";
import PhotoItem from "../PhotoItem/PhotoItem";
import { Button } from "../Button/Button";
import {
  InitialGalleryStateType,
  setCurrentPage,
} from "../../store/gallery-reducer";
import { PhotoItemForArtists } from "../PhotoItem/PhotoItemForArtists";
import { setSearchFeatureShown } from "../../store/app-reducer";

const cx = classNames.bind(style);

type ArtistArtworksPropsType = {
  artists?: Array<ArtistResponseType>;
  artworks?: Array<AuthorPaintingsType>;
  onAddEditPictureClick?: (mode: "edit" | "add") => void;
  onDeletePictureClick?: (paintingId: string) => void;
  setSliderVisible?: (value: boolean) => void;
  setPaintingId?: (id: string) => void;
  onLoadMore?: () => void;
  isMobileMode: boolean;
};

const Gallery = React.memo(
  ({
    artists,
    artworks,
    onAddEditPictureClick,
    onDeletePictureClick,
    onLoadMore,
    setPaintingId,
    isMobileMode,
  }: ArtistArtworksPropsType) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const dispatch = useDispatch<AppDispatch>();

    const isLoggedIn = useSelector<IAppStore, boolean>(
      ({ auth }) => auth.isLoggedIn
    );
    const { portionSize, currentPage, totalArtistsCount, galleryMessage } =
      useSelector<IAppStore, InitialGalleryStateType>(({ gallery }) => gallery);

    useEffect(() => {
      return () => {
        dispatch(setCurrentPage({ currentPage: 1 }));
      };
    }, []);

    useEffect(() => {
      if (isLoggedIn && artists) {
        dispatch(setSearchFeatureShown({ isSearchFeatureShown: true }));
      }
      return () => {
        if (isLoggedIn && artists) {
          dispatch(setSearchFeatureShown({ isSearchFeatureShown: false }));
        }
      };
    }, [isLoggedIn, artists]);

    return (
      <div className={cx("main")}>
        {isLoggedIn && artworks && (
          <Button
            value="add picture"
            type="add"
            theme={theme}
            width="110px"
            callback={
              onAddEditPictureClick && (() => onAddEditPictureClick("add"))
            }
          />
        )}

        <div className={cx("mainContainer")}>
          {artists?.map((artist) => (
            <PhotoItemForArtists
              key={artist._id}
              id={artist._id}
              name={artist.name}
              years={artist.yearsOfLife}
              picture={artist.mainPainting?.image?.src || "no image"}
              theme={theme}
            />
          ))}
          {artworks &&
            artworks.map((i) => (
              <PhotoItem
                pictureData={i}
                id={i._id}
                key={i._id}
                name={i.name}
                years={i.yearOfCreation}
                picture={i.image.src ? i.image.src : "no image"}
                theme={theme}
                onDeletePictureClick={onDeletePictureClick}
                onEditPictureClick={
                  onAddEditPictureClick && onAddEditPictureClick
                }
                setPaintingId={setPaintingId}
                isMobileMode={isMobileMode}
              />
            ))}
        </div>
        {!galleryMessage &&
          artists?.length &&
          currentPage !== Math.ceil(totalArtistsCount / portionSize) && (
            <div className={cx("loadMoreButton")}>
              <Button
                value="load more"
                theme={theme}
                type="outlined"
                width="200px"
                callback={onLoadMore}
              />
            </div>
          )}
        {galleryMessage && (
          <div className={cx("galleryMessage")}>{galleryMessage}</div>
        )}
      </div>
    );
  }
);

export default Gallery;
