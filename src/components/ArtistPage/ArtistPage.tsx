import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import ArtistProfile from './ArtistProfile';
import ArtistArtworks from './ArtistArtworks';
import { getArtistInfoTC } from '../../store/artistPage-reducer';
import { ArtistResponseType } from '../../utils/api';
// @ts-ignore
import style from './ArtistPage.scss';

const cx = classNames.bind(style);

const ArtistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();
  const artistInfo = useSelector<IAppStore, ArtistResponseType>(
    (state) => state.artistPage.artistInfo,
  );
  useEffect(() => {
    if (authorId) {
      dispatch(getArtistInfoTC(authorId));
    }
  }, [authorId]);

  return (
    <div className={cx('artistPage')}>
      <ArtistProfile artistInfo={artistInfo} />
      <ArtistArtworks />
    </div>
  );
};

export default ArtistPage;
