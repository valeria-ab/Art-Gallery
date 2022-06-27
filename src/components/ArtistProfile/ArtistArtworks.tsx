import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { AuthorPaintingsType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import { IAppStore } from '../../store/store';
// @ts-ignore
import style from './ArtistPage.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

const ArtistArtworks = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    (state) => state.artistPage.artworks,
  );
  return (
    <div className={cx('artistArtworks')}>
      <div className={cx('artistArtworks__heading', {
        artistArtworks__heading__light: theme === 'light',
        artistArtworks__heading__dark: theme === 'dark',
      })}
      >
        Artworks
      </div>
      <Gallery artworks={artworks} />
    </div>
  );
};

export default ArtistArtworks;
