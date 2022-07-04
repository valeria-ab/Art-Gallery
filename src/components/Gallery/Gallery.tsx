import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { ThemeContext } from '../../contexts/ThemeContext';
import s from './Gallery.module.scss';
import PhotoItem from '../PhotoItem/PhotoItem';
import { getArtistsTC, setArtists } from '../../store/gallery-reducer';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { Button } from '../Button/Button';

type ArtistArtworksPropsType = {
  artists?: Array<ArtistResponseType>;
  artworks?: Array<AuthorPaintingsType>;
};

const Gallery = ({ artists, artworks }: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  useEffect(() => {
    // if (artists) dispatch(getArtistsTC());
  }, []);

  return (
    <div className={s.main}>
      {isInitialized && <Button value="add artist" type="outlined" theme={theme} width="100px" />}
      <div className={s.mainContainer}>
        {artists && artists.map((a) => (
          <PhotoItem
            key={a._id}
            id={a._id}
            name={a.name}
            years={a.yearsOfLife}
            picture={a.mainPainting.image.src}
            theme={theme}
          />
        ))}
        {artworks && artworks.map((i) => (
          <PhotoItem
            key={i._id}
            name={i.name}
            years={i.yearOfCreation}
            picture={i.image.src}
            id={i._id}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
