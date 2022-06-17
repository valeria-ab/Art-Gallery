import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch, IAppStore } from '../../store/store';
import ArtistProfile from './ArtistProfile';
import ArtistArtworks from './ArtistArtworks';
import { getArtistInfoTC } from '../../store/artistPage-reducer';
import { ArtistResponseType } from '../../utils/api';
import s from './ArtistPage.module.scss';

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
    <div className={s.artistPage}>
      <ArtistProfile artistInfo={artistInfo} />
      <ArtistArtworks />
    </div>
  );
};

export default ArtistPage;
