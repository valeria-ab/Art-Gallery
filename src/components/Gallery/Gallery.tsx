import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import style from './style.scss';
import PhotoItem from '../PhotoItem/PhotoItem';
import { Button } from '../Button/Button';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';
import settingsIconLight from '../../assets/mainPageFilters/settingsIconLight.png';
import searchIconLight from '../../assets/mainPageFilters/searchIconLight.png';
import { InitialGalleryStateType, UrlParamsType } from '../../store/gallery-reducer';
import useDebounce from '../../hooks/useDebounce';

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
    ({ auth }) => auth.isInitialized,
  );
  // const urlParams = useSelector<IAppStore, UrlParamsType>((state) => state.gallery.urlParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const prevParams = Object.fromEntries(searchParams);
  // const [name, setName] = useState('');

  const { portionSize, currentPagesPortion, totalPagesCount } = useSelector<IAppStore,
      InitialGalleryStateType>(({ gallery }) => gallery);

  // const onKeyUpHandler = useDebounce(() => {
  //   if (name) {
  //     setSearchParams({ ...prevParams, name });
  //   } else {
  //     delete prevParams.name;
  //     setSearchParams({ ...prevParams });
  //   }
  // }, 1000);

  // const onEnterPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.charCode === 13) {
  //     setSearchParams({ ...prevParams, name });
  //   }
  // };

  // useEffect(() => {
  //   if (urlParams.name) setName(urlParams.name);
  // }, [urlParams.name]);

  return (
    <div className={cx('main')}>
      {/* {isAddArtistMode */}
      {/*    && <AddEditArtist onCancelCallback={setAddArtistMode} />} */}
      {/* {isInitialized && artists && ( */}
      {/* <div className={cx('buttons_wrapper')}> */}
      {/*  <Button */}
      {/*    value="add artist" */}
      {/*    type="outlined" */}
      {/*    theme={theme} */}
      {/*    width="100px" */}
      {/*    callback={() => setAddArtistMode(true)} */}
      {/*  /> */}
      {/*  <div className={cx('filterButtons_wrapper')}> */}
      {/*    <div className={cx('searchContainer', { */}
      {/*      searchContainer_dark: themes.dark, */}
      {/*      searchContainer_light: themes.light, */}
      {/*    })} */}
      {/*    > */}
      {/*      <div className={cx('searchIconContainer')}> */}
      {/*        <img */}
      {/*          src={searchIconLight} */}
      {/*          alt="searchIcon" */}
      {/*          className={cx('searchIcon')} */}
      {/*        /> */}
      {/*      </div> */}

      {/*      <input */}
      {/*        className={cx('searchContainer_input', { */}
      {/*          searchContainer_input_light: themes.light, */}
      {/*          searchContainer_input_dark: themes.dark, */}
      {/*        })} */}
      {/*        onChange={(e) => { setName(e.currentTarget.value); }} */}
      {/*        onKeyUp={onKeyUpHandler} */}
      {/*        onKeyPress={onEnterPressHandler} */}
      {/*      /> */}
      {/*    </div> */}
      {/*    <div style={{ width: '28px', height: '28px', backgroundColor: '' }}> */}
      {/*      <img */}
      {/*        src={settingsIconLight} */}
      {/*        alt="settingsIconLight" */}
      {/*        style={{ */}
      {/*          width: '15.91px', */}
      {/*          height: '13px', */}
      {/*        }} */}
      {/*      /> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
      {/* )} */}
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
        {artists?.map((artist) => (
          <PhotoItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            years={artist.yearsOfLife}
            picture={artist.mainPainting?.image?.src || 'no image'}
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
