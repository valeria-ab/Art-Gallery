import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { ThemeContext } from '../../contexts/ThemeContext';
import style from './style.scss';
import PhotoItem from '../PhotoItem/PhotoItem';
import { Button } from '../Button/Button';
import { InitialGalleryStateType } from '../../store/gallery-reducer';
import { PhotoItemForArtists } from '../PhotoItem/PhotoItemForArtists';

const cx = classNames.bind(style);

type ArtistArtworksPropsType = {
    artists?: Array<ArtistResponseType>;
    artworks?: Array<AuthorPaintingsType>;
    onAddEditPictureClick?: (mode: 'edit' | 'add') => void;
    onDeletePictureClick?: (paintingId: string) => void;
    setSliderVisible?: (value: boolean) => void;
    onLoadMore?: () => void;
};

// eslint-disable-next-line react/display-name
const Gallery = React.memo(({
  artists,
  artworks,
  onAddEditPictureClick,
  onDeletePictureClick,
  setSliderVisible,
  onLoadMore,
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );

  const { portionSize, currentPagesPortion, totalPagesCount } = useSelector<IAppStore,
        InitialGalleryStateType>(({ gallery }) => gallery);

  return (
    <div className={cx('main')}>
      {isInitialized && artworks && (
        <Button
          value="add picture"
          type="add"
          theme={theme}
          width="110px"
          callback={onAddEditPictureClick && (() => onAddEditPictureClick('add'))}
        />
      )}

      <div className={cx('mainContainer')}>
        {artists?.map((artist) => (
          <PhotoItemForArtists
            key={artist._id}
            id={artist._id}
            name={artist.name}
            years={artist.yearsOfLife}
            picture={artist.mainPainting?.image?.src || 'no image'}
            theme={theme}
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
            onDeletePictureClick={onDeletePictureClick}
            onEditPictureClick={onAddEditPictureClick && onAddEditPictureClick}
            setSliderVisible={setSliderVisible}
          />
        ))}
      </div>
      {artists && currentPagesPortion !== Math.ceil(totalPagesCount / portionSize) && (
        <div className={cx('loadMoreButton')}>
          <Button
            value="load more"
            theme={theme}
            type="outlined"
            width="200px"
            callback={onLoadMore}
          />
        </div>

      )}
    </div>
  );
});

export default Gallery;
