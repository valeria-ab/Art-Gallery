import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import ArtistProfile from './ArtistProfile';
import {
  getArtistInfoStaticTC,
  getArtistInfoTC,
} from '../../store/artistPage-reducer';
import { ArtistResponseType } from '../../utils/api';
// @ts-ignore
import style from './ArtistPage.scss';
import ArtistArtworks from './ArtistArtworks';
import { AddPicture } from '../modals/addPicture/AddPicture';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';

const cx = classNames.bind(style);

const ArtistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();
  const artistInfo = useSelector<IAppStore, ArtistResponseType>(
    (state) => state.artistPage.artistInfo,
  );
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  const [addPictureModeOn, setAddPictureModeOn] = useState(false);

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
      <button onClick={() => setAddPictureModeOn(!addPictureModeOn)}>set</button>
      {addPictureModeOn
                && <AddPicture addPictureModeOn={addPictureModeOn} setAddPictureModeOn={setAddPictureModeOn} />}
      <ArtistProfile artistInfo={artistInfo} />
      <ArtistArtworks setAddPictureModeOn={setAddPictureModeOn} addPictureModeOn={addPictureModeOn} />
    </div>
  );
};

export default ArtistPage;
