import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import style from './ArtistPage.scss';
import arrowBack from '../../assets/buttons/arrowBackLight.png';
import dash from '../../assets/artistProfile/dash.png';
import edit from '../../assets/artistProfile/edit.png';
import deleteIcon from '../../assets/artistProfile/deleteIcon.png';
import learnMoreIcon from '../../assets/buttons/learnMoreIcon.png';
import { IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { Genre } from './Genre/Genre';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button } from '../Button/Button';

const cx = classNames.bind(style);

type PropsType = {
    artistInfo: ArtistResponseType;
    setDeleteArtistModeOn: (value: boolean) => void;
    setEditArtistModeOn: (value: boolean) => void;
    deleteArtistModeOn: boolean;
}

const ArtistProfile = (props: PropsType) => {
  const {
    artistInfo,
    deleteArtistModeOn,
    setDeleteArtistModeOn,
    setEditArtistModeOn,
  } = props;
  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cx('artistPage')}>
      <div className={cx('profile_top')}>
        <NavLink to="/artists" className={cx('comeBackButton')}>
          {/* <img src={arrowBack} alt="arrowBack" width="10px" height="16px" /> */}
          <Button
            value="back"
            theme={theme}
            type="arrow"
            width="100px"
          />
        </NavLink>
        {isInitialized && (
        <div className={cx('deleteEditBlock')}>
          <img
            className={cx('deleteEditIcon')}
            src={edit}
            alt="edit"
            onClick={() => setEditArtistModeOn(true)}
          />
          <img
            className={cx('deleteEditIcon')}
            src={deleteIcon}
            alt="delete"
            onClick={() => setDeleteArtistModeOn(true)}
          />
        </div>
        )}
      </div>

      {artistInfo.avatar && (
        <div className={cx('artistProfile')}>
          <div className={cx('mainPhoto')}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${artistInfo.avatar.src2x}`}
              alt="artist_picture"
              className={cx('profilePicture')}
            />
            <div className={cx('infoBlock', {
              infoBlock__light: theme === 'light',
              infoBlock__dark: theme === 'dark',
            })}
            >
              <div className={cx('artistInfo')}>
                <span className={cx('infoBlock__padding')}>
                  {artistInfo.yearsOfLife}
                </span>
              </div>
              <div
                className={cx('artistNameContainer', {
                  artistNameContainer__light: theme === 'light',
                  artistNameContainer__dark: theme === 'dark',
                })}
              >
                <span className={cx('artistName')}>{artistInfo.name}</span>
              </div>
              <div className={cx('dash')}>
                <img src={dash} alt="dash" width="30px" />
              </div>
              <div className={cx('artistDescription')}>
                {artistInfo.description}
              </div>
              <div className={cx('learnMoreButton')}>
                <Button
                  value="read more"
                  width="200px"
                  type="outlined"
                  theme={theme}
                />
                <img
                  src={learnMoreIcon}
                  alt="learnMoreIcon"
                  width="12px"
                  height="7px"
                />
              </div>

              <div className={cx('genresBlock')}>
                {artistInfo.genres.map((g) => (
                  <Genre key={g._id} value={g.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
