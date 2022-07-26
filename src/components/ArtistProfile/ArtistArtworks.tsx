import React, { useContext, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import { AppDispatch, IAppStore } from '../../store/store';
// @ts-ignore
import style from './ArtistPage.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { setCurrentPagesPortion } from '../../store/artistPage-reducer';

const cx = classNames.bind(style);

type PropsType = {
    onAddEditPictureClick: (mode: 'edit' | 'add') => void;
    // addEditPictureModeOn: boolean;
    onDeletePictureClick: (paintingId: string) => void;
}

const ArtistArtworks = ({
  onAddEditPictureClick,
  // addEditPictureModeOn,
  onDeletePictureClick,
}: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    (state) => state.artistPage.artistInfo.paintings,
  );

  const portionSize = useSelector<IAppStore, number>(
    (state) => state.artistPage.portionSize,
  );
  const currentPagesPortion = useSelector<IAppStore, number>(
    (state) => state.artistPage.currentPagesPortion,
  );

  const paintingsCurrentPortion = artworks.slice(
    portionSize * currentPagesPortion - portionSize, portionSize * currentPagesPortion,
  );

  const [paintingsPortion, setPaintingsPortion] = useState([] as AuthorPaintingsType[]);

  useEffect(() => {
    setPaintingsPortion(paintingsCurrentPortion);
  }, [artworks]);

  useEffect(() => {
    setPaintingsPortion([...paintingsPortion, ...paintingsCurrentPortion]);
  }, [portionSize, currentPagesPortion]);

  const onLoadMore = () => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: currentPagesPortion + 1 }));
  };

  return (
    <div className={cx('artistArtworks')}>
      <div className={cx('artistArtworks__heading', {
        artistArtworks__heading__light: theme === 'light',
        artistArtworks__heading__dark: theme === 'dark',
      })}
      >
        Artworks
      </div>
      <Gallery
        artworks={artworks}
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
        onLoadMore={onLoadMore}
      />
    </div>
  );
};

export default ArtistArtworks;
