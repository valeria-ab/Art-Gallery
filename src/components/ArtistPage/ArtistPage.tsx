import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { AppDispatch, IAppStore } from "../../store/store";
import ArtistProfile, { NoArtworks } from "./ArtistProfile/ArtistProfile";
import {
  deleteArtistTC,
  deletePaintingTC,
  getArtistInfoStaticTC,
  getArtistInfoTC,
  setArtworksCurrentPage,
} from "../../store/artistPage-reducer";
import { ArtistResponseType, AuthorPaintingsType } from "../../utils/api";
import style from "./ArtistPage.scss";
import ArtistArtworks from "./ArtistArtworks";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import ArtworksSlider from "../Slider/ArtworksSlider";
import { setSearchFeatureShown } from "../../store/app-reducer";
import { AddEditArtist } from "./AddEditArtist/AddEditArtist";
import { AddEditPicture } from "./AddEditPicture/AddEditPicture";

const cx = classNames.bind(style);

const ArtistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const artistInfo = useSelector<IAppStore, ArtistResponseType>(
    ({ artistPage }) => artistPage.artistInfo
  );
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings
  );

  const isLoggedIn = useSelector<IAppStore, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const [addEditPictureModeOn, setAddEditPictureModeOn] = useState(false);
  const [deletePictureModeOn, setDeletePictureModeOn] = useState(false);
  const [deleteArtistModeOn, setDeleteArtistModeOn] = useState(false);
  const [editArtist, setEditArtistModeOn] = useState(false);
  const [paintingId, setPaintingId] = useState<string>();
  const [addEditPictureMode, setAddEditPictureMode] =
    useState<"edit" | "add">("add");
  const [sliderVisible, setSliderVisible] = useState<boolean>(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);

  const successMessage = useSelector<IAppStore, string>(
    (state) => state.app.successMessage
  );
  const error = useSelector<IAppStore, string>((state) => state.app.error);

  const [paintingIndex, setPaintingIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = artworks?.findIndex((artwork) => artwork._id === paintingId);
    if (index >= 0) setPaintingIndex(index);
    paintingId && setSliderVisible(true);
  }, [paintingId]);

  const onDeleteArtistCallback = () => {
    if (authorId) dispatch(deleteArtistTC(authorId));
    navigate("/artists");
  };

  const onDeletePaintingCallback = () => {
    if (authorId && paintingId)
      dispatch(deletePaintingTC(authorId, paintingId));
    setDeletePictureModeOn(false);
  };
  const onDeletePictureClick = (pictureId: string) => {
    setDeletePictureModeOn(true);
    setPaintingId(pictureId);
  };
  const onCancelDeletePictureClick = () => setDeletePictureModeOn(false);

  const onAddEditPictureClick = (mode: "edit" | "add") => {
    setAddEditPictureModeOn(true);
    setAddEditPictureMode(mode);
  };

  useEffect(() => {
    if (authorId) {
      if (!isLoggedIn) {
        dispatch(getArtistInfoStaticTC(authorId));
      }
      if (isLoggedIn) {
        dispatch(getArtistInfoTC(authorId));
      }
      return () => {
        dispatch(setArtworksCurrentPage({ artworksCurrentPage: 1 }));
      };
    }
  }, [authorId, isLoggedIn]);

  useEffect(() => {
    dispatch(setSearchFeatureShown({ isSearchFeatureShown: false }));
  }, []);

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

  if (isMobileMode && addEditPictureModeOn) {
    return (
      <AddEditPicture
        addPictureModeOn={addEditPictureModeOn}
        setAddPictureModeOn={setAddEditPictureModeOn}
        mode={addEditPictureMode}
      />
    );
  }

  if (isMobileMode && editArtist) {
    return (
      <AddEditArtist
        mode="edit"
        isMobileMode={isMobileMode}
        onCancelCallback={setEditArtistModeOn}
        artistDescription={artistInfo.description}
        artistName={artistInfo.name}
        artistYearsOfLife={artistInfo.yearsOfLife}
        avatar={artistInfo.avatar.src}
        authorId={authorId}
        artistGenres={artistInfo.genres}
      />
    );
  }

  return (
    <div className={cx("artistPage")}>
      {addEditPictureModeOn && (
        <AddEditPicture
          addPictureModeOn={addEditPictureModeOn}
          setAddPictureModeOn={setAddEditPictureModeOn}
          mode={addEditPictureMode}
        />
      )}
      {deletePictureModeOn && (
        <DeleteModal
          theme={theme}
          primaryTitle="picture"
          secondaryTitle="picture"
          cancelCallback={onCancelDeletePictureClick}
          onDeleteCallback={onDeletePaintingCallback}
        />
      )}
      {deleteArtistModeOn && (
        <DeleteModal
          theme={theme}
          primaryTitle="artist profile"
          secondaryTitle="profile"
          cancelCallback={() => setDeleteArtistModeOn(false)}
          onDeleteCallback={onDeleteArtistCallback}
        />
      )}
      {editArtist && (
        <AddEditArtist
          mode="edit"
          isMobileMode={isMobileMode}
          onCancelCallback={setEditArtistModeOn}
          artistDescription={artistInfo.description}
          artistName={artistInfo.name}
          artistYearsOfLife={artistInfo.yearsOfLife}
          avatar={artistInfo.avatar.src}
          authorId={authorId}
          artistGenres={artistInfo.genres}
        />
      )}
      {sliderVisible && paintingIndex !== null && (
        <ArtworksSlider
          currentIndex={paintingIndex}
          setPaintingId={setPaintingId}
          setSliderVisible={setSliderVisible}
          onAddEditPictureClick={onAddEditPictureClick}
          onDeletePictureClick={onDeletePictureClick}
        />
      )}
      <ArtistProfile
        artistInfo={artistInfo}
        setDeleteArtistModeOn={setDeleteArtistModeOn}
        setEditArtistModeOn={setEditArtistModeOn}
      />
      <ArtistArtworks
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
        setSliderVisible={setSliderVisible}
        setPaintingId={setPaintingId}
        isMobileMode={isMobileMode}
      />
      {artworks?.length < 1 && (
        <div className={cx("noArtworksContainer")}>
          <NoArtworks
            addArtwork={setAddEditPictureMode}
            setAddEditPictureModeOn={setAddEditPictureModeOn}
          />
          <div className={cx("breakLineContainer")}>
            <div className={cx("breakLine", `breakLine_${theme}`)} />
          </div>
          <div className={cx("noArtworksDescription")}>
            The paintings of this artist have not been uploaded yet.
          </div>
        </div>
      )}
      {(error || successMessage) && <ToastMessage />}
    </div>
  );
};

export default ArtistPage;
