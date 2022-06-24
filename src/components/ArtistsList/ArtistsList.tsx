import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { getArtistsTC } from '../../store/gallery-reducer';
import { ThemeContext } from '../../contexts/ThemeContext';
import s from './ArtistsList.module.scss';
import PhotoItem from '../PhotoItem/PhotoItem';

const ArtistsList = React.memo(() => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const artists = useSelector<IAppStore, Array<ArtistResponseType>>(
    (state) => state.gallery.artists,
  );

  useEffect(() => {
    dispatch(getArtistsTC());
  }, []);

  return (
    <div className={s.main}>
      {artists.map((a) => (
        <PhotoItem
          key={a._id}
          id={a._id}
          name={a.name}
          yearsOfLife={a.yearsOfLife}
          picture={a.mainPainting.image.src}
          theme={theme}
        />
      ))}
    </div>
  );
});
// 👇️ set display name
ArtistsList.displayName = 'ArtistsList';
export default ArtistsList;
