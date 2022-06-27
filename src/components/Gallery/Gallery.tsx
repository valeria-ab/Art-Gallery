import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { getArtistsTC } from '../../store/gallery-reducer';
import { ThemeContext } from '../../contexts/ThemeContext';
import s from './Gallery.module.scss';
import PhotoItem from '../PhotoItem/PhotoItem';

type ArtistArtworksPropsType = {
  artists?: Array<ArtistResponseType>;
  artworks?: Array<AuthorPaintingsType>;
};

const Gallery = ({ artists, artworks }: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (artists) dispatch(getArtistsTC());
    if (artworks) dispatch(getArtistsTC());
  }, []);

  return (
    <div className={s.main}>
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
  );
};

export default Gallery;
