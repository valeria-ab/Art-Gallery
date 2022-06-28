import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import style from './ArtistPage.scss';
import arrowBack from '../../assets/buttons/arrowBack.png';
import dash from '../../assets/artistProfile/dash.png';
import learnMoreIcon from '../../assets/buttons/learnMoreIcon.png';
import { IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { Genre } from './Genre/Genre';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button } from '../Button/Button';

const cx = classNames.bind(style);

const ArtistProfile = (props: { artistInfo: ArtistResponseType }) => {
  const { artistInfo } = props;

  const { theme, toggleTheme } = useContext(ThemeContext);
  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );

  return (
    <div className={cx('artistPage')}>
      <div>
        <NavLink to="/artists/static" className={cx('comeBackButton')}>
          <img src={arrowBack} alt="arrowBack" width="10px" height="16px" />
          <Button value="back" theme={theme} type="outlined" width="50px" />
        </NavLink>
      </div>

      {artistInfo.avatar && (
        <div className={cx('artistProfile')}>
          <div className={cx('mainPhoto')}>
            <img
                // src="https://internship-front.framework.team/images/62a32e09269fa5c416c53d91/original.jpg"
              src={`${baseURL}${artistInfo.avatar.src2x}`}
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
              <div className={cx('dash')}><img src={dash} alt="dash" width="30px" /></div>
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