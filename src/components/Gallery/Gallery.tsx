import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { ThemeContext } from '../../contexts/ThemeContext';
import style from './style.scss';
import PhotoItem from '../PhotoItem/PhotoItem';
import { Button } from '../Button/Button';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';
import settingsIconLight from '../../assets/mainPageFilters/settingsIconLight.png';
import searchIconLight from '../../assets/mainPageFilters/searchIconLight.png';

const cx = classNames.bind(style);

type ArtistArtworksPropsType = {
    artists?: Array<ArtistResponseType>;
    artworks?: Array<AuthorPaintingsType>;
    onAddEditPictureClick?: (mode: 'edit' | 'add') => void;
    onDeletePictureClick?: (paintingId: string) => void;
    onLoadMore?: () => void;
};

// eslint-disable-next-line react/display-name
const Gallery = React.memo(({
  artists,
  artworks,
  onAddEditPictureClick,
  onDeletePictureClick,
  onLoadMore,
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  const portionSize = useSelector<IAppStore, number>(
    (state) => state.gallery.portionSize,
  );
  const currentPagesPortion = useSelector<IAppStore, number>(
    (state) => state.gallery.currentPagesPortion,
  );
  const totalPagesCount = useSelector<IAppStore, number>(
    (state) => state.gallery.totalPagesCount,
  );
  const [isAddArtistMode, setAddArtistMode] = useState(false);

  return (
    <div className={cx('main')}>
      {isAddArtistMode && <AddEditArtist onCancelCallback={setAddArtistMode} />}
      {isInitialized && artists && (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',

      }}
      >
        <Button
          value="add artist"
          type="outlined"
          theme={theme}
          width="100px"
          callback={() => setAddArtistMode(true)}
        />
        <div style={{
          display: 'flex',
          width: '400px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <div style={{
            width: '344px',
            height: '32px',
            border: '1px solid',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <div style={{ padding: '8px 20px' }}>
              <img
                src={searchIconLight}
                alt="searchIconLight"
                width="16px"
                height="16px"
              />
            </div>

            <input style={{
              outline: 'none', border: 'none', width: '288px', height: '31px',
            }}
            />
          </div>
          <div style={{ width: '28px', height: '28px', backgroundColor: '' }}>
            <img
              src={settingsIconLight}
              alt="settingsIconLight"
              style={{
                width: '15.91px',
                height: '13px',
              }}
            />
          </div>
        </div>
      </div>
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

      <div className={cx('mainContainer')}>
        {artists && artists.map((a) => (
          <PhotoItem
            key={a._id}
            id={a._id}
            name={a.name}
            years={a.yearsOfLife}
            picture={a.mainPainting && a.mainPainting.image && a.mainPainting.image.src
              ? a.mainPainting.image.src
              : 'no image'}
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
            onEditPictureClick={onAddEditPictureClick && onAddEditPictureClick}
          />
        ))}
      </div>
      {artists && currentPagesPortion !== Math.ceil(totalPagesCount / portionSize) && (
      <Button
        value="load more"
        theme={theme}
        type="outlined"
        width="200px"
        callback={onLoadMore}
      />
      )}
    </div>
  );
});

export default Gallery;
