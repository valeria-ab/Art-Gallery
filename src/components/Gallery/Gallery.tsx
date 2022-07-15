import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { ThemeContext } from '../../contexts/ThemeContext';
import s from './Gallery.module.scss';
import PhotoItem from '../PhotoItem/PhotoItem';
import { getArtistsStaticTC, getArtistsTC } from '../../store/gallery-reducer';
import { Button } from '../Button/Button';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';

type ArtistArtworksPropsType = {
    artists?: Array<ArtistResponseType>;
    artworks?: Array<AuthorPaintingsType>;
    setAddPictureModeOn?: (value: boolean) => void;
    addPictureModeOn?: boolean
};

// eslint-disable-next-line react/display-name
const Gallery = React.memo(({
  artists, artworks, setAddPictureModeOn, addPictureModeOn,
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  const accessToken = useSelector<IAppStore, string>(
    (state) => state.auth.accessToken,
  );

  useEffect(() => {
    if (isInitialized) {
      dispatch(getArtistsTC());
    } else {
      dispatch(getArtistsStaticTC());
    }
  }, [isInitialized, accessToken]);

  return (
    <div className={s.main}>
      {isInitialized && artists && <Button value="add artist" type="outlined" theme={theme} width="100px" />}
      {isInitialized && artworks && (
      <Button
        value="add picture"
        type="outlined"
        theme={theme}
        width="100px"
        callback={setAddPictureModeOn && (() => setAddPictureModeOn(!addPictureModeOn))}
      />
      )}

      <div className={s.mainContainer}>
        {artists && artists.map((a) => (
          <PhotoItem
            key={a._id}
            id={a._id}
            name={a.name}
            years={a.yearsOfLife}
            picture={a.mainPainting.image.src}
            theme={theme}
            onHover="artists"
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
            onHover="artworks"
          />
        ))}
      </div>
    </div>
  );
});

export default Gallery;
