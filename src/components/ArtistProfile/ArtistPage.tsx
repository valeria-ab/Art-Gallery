import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import ArtistProfile from './ArtistProfile';
import {
  deleteArtistTC, deletePaintingTC,
  getArtistInfoStaticTC,
  getArtistInfoTC,
} from '../../store/artistPage-reducer';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
// @ts-ignore
import style from './ArtistPage.scss';
import ArtistArtworks from './ArtistArtworks';
import { AddEditPicture } from '../modals/AddEditPicture/AddEditPicture';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';
import { DeleteModal } from '../modals/delete/DeleteModal';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

const ArtistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const artistInfo = useSelector<IAppStore, ArtistResponseType>(
    (state) => state.artistPage.artistInfo,
  );
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  const [addEditPictureModeOn, setAddEditPictureModeOn] = useState(false);
  const [deletePictureModeOn, setDeletePictureModeOn] = useState(false);
  const [deleteArtistModeOn, setDeleteArtistModeOn] = useState(false);
  const [editArtist, setEditArtistModeOn] = useState(false);
  const [paintingId, setPaintingId] = useState<string>();
  const [addEditPictureMode, setAddEditPictureMode] = useState<'edit' | 'add'>('add');

  // artist

  const onDeleteArtistClick = () => setDeletePictureModeOn(true);
  const onCancelDeleteArtistClick = () => setDeletePictureModeOn(false);
  const onDeleteArtistCallback = () => authorId && dispatch(deleteArtistTC(authorId));

  // picture

  const onDeletePaintingCallback = () => {
    if (authorId && paintingId) dispatch(deletePaintingTC(authorId, paintingId));
    setDeletePictureModeOn(false);
  };
  const onDeletePictureClick = (pictureId: string) => {
    setDeletePictureModeOn(true);
    setPaintingId(pictureId);
  };
  const onCancelDeletePictureClick = () => setDeletePictureModeOn(false);

  const onAddEditPictureClick = (mode: 'edit' | 'add') => {
    setAddEditPictureModeOn(true);
    setAddEditPictureMode(mode);
  };

  useEffect(() => {
    if (authorId) {
      if (!isInitialized) {
        dispatch(getArtistInfoStaticTC(authorId));
      }
      dispatch(getArtistInfoTC(authorId));
    }
  }, [authorId, isInitialized]);

  return (
    <div className={cx('artistPage')}>
      {addEditPictureModeOn
                && (
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
        cancelCallback={() => setDeleteArtistModeOn}
        onDeleteCallback={onDeleteArtistCallback}
      />
      )}
      {editArtist && (
      <AddEditArtist
        onCancelCallback={setEditArtistModeOn}
        artistDescription={artistInfo.description}
        artistName={artistInfo.name}
        artistYearsOfLife={artistInfo.yearsOfLife}
        avatar={artistInfo.avatar.src}
      />
      )}
      <ArtistProfile
        artistInfo={artistInfo}
        setDeleteArtistModeOn={setDeleteArtistModeOn}
        deleteArtistModeOn={deleteArtistModeOn}
        setEditArtistModeOn={setEditArtistModeOn}
      />
      <ArtistArtworks
        // setAddEditPictureModeOn={() => setAddEditPictureModeOn}
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
      />
    </div>
  );
};

export default ArtistPage;
