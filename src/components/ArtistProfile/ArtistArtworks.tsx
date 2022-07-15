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

type PropsType = {
    setAddPictureModeOn: (value: boolean) => void;
    addPictureModeOn: boolean
}

const ArtistArtworks = ({ setAddPictureModeOn, addPictureModeOn }: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    (state) => state.artistPage.artistInfo.paintings,
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
      <Gallery artworks={artworks} setAddPictureModeOn={setAddPictureModeOn} addPictureModeOn={addPictureModeOn} />
    </div>
  );
};

export default ArtistArtworks;
