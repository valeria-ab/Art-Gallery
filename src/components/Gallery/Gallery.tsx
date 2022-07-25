import React, { useContext, useEffect, useState } from 'react';
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
    onAddEditPictureClick?: (mode: 'edit' | 'add') => void;
    onDeletePictureClick?: (paintingId: string) => void;
};

// eslint-disable-next-line react/display-name
const Gallery = React.memo(({
  artists,
  artworks,
  onAddEditPictureClick,
  onDeletePictureClick,
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );

  const [isAddArtistMode, setAddArtistMode] = useState(false);

  return (
    <div className={s.main}>
      {isAddArtistMode && <AddEditArtist onCancelCallback={setAddArtistMode} />}
      {isInitialized && artists && (
        <Button
          value="add artist"
          type="outlined"
          theme={theme}
          width="100px"
          callback={() => setAddArtistMode(true)}
        />
      )}
      {isInitialized && artworks && (
        <Button
          value="add picture"
          type="outlined"
          theme={theme}
          width="100px"
          callback={onAddEditPictureClick && (() => onAddEditPictureClick('add'))}
        />
      )}

      <div className={s.mainContainer}>
        {artists && artists.map((a) => (
          <PhotoItem
            key={a._id}
            id={a._id}
            name={a.name}
            years={a.yearsOfLife}
            picture={a.mainPainting ? a.mainPainting.image.src : 'no image'}
            theme={theme}
            onHover="artists"
          />
        ))}
        {artworks && artworks.map((i) => (
          <PhotoItem
            pictureData={i}
            id={i._id}
            key={i._id}
            name={i.name}
            years={i.yearOfCreation}
            picture={i.image.src ? i.image.src : 'no image'}
            theme={theme}
            onHover="artworks"
            onDeletePictureClick={onDeletePictureClick}
            onEditPictureClick={() => onAddEditPictureClick && onAddEditPictureClick('edit')}
          />
        ))}
      </div>
    </div>
  );
});

export default Gallery;
