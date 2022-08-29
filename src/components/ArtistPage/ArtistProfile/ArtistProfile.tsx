import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import style from './style.scss';
import dashDark from '../../../assets/artistProfile/dashDark.png';
import dashLight from '../../../assets/artistProfile/dashLight.png';
import edit from '../../../assets/artistProfile/edit.png';
import deleteIcon from '../../../assets/artistProfile/deleteIcon.png';
import learnMoreIconLight from '../../../assets/buttons/learnMoreIconLight.png';
import learnMoreIconDark from '../../../assets/buttons/learnMoreIconDark.png';
import { IAppStore } from '../../../store/store';
import { ArtistResponseType } from '../../../utils/api';
import { Genre } from '../Genre/Genre';
import { ThemeContext, themes } from '../../../contexts/ThemeContext';
import { Button } from '../../Button/Button';
import noImagePlug from '../../../assets/photoItem/noImagePlug.png';
import addDark from '../../../assets/buttons/addDark.png';

const cx = classNames.bind(style);

type PropsType = {
    artistInfo: ArtistResponseType;
    setDeleteArtistModeOn: (value: boolean) => void;
    setEditArtistModeOn: (value: boolean) => void;
}

const ArtistProfile = (props: PropsType) => {
  const {
    artistInfo,
    setDeleteArtistModeOn,
    setEditArtistModeOn,
  } = props;
  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isReadMoreMode, setReadMoreMode] = useState(false);

  return (
    <div className={cx('artistPage')}>
      <div className={cx('profile_top')}>
        <NavLink to="/artists" className={cx('comeBackButton')}>
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

      <div className={cx('artistProfile')}>
        <div className={cx('mainPhoto')}>
          {artistInfo.avatar ? (
            <img
              src={`${process.env.REACT_APP_BASE_URL}${artistInfo.avatar.src2x}`}
              alt="artist_picture"
              className={cx('profilePicture')}
            />
          )
            : (
              <div className={cx('noPictureBlock')}>

                <img
                  src={noImagePlug}
                  width="254px"
                  height="228px"
                  alt="artist_picture"
                />

                <p className={cx('noPictureDescription')}>No Image uploaded</p>
              </div>
            )}
          <div className={cx('infoBlock', {
            infoBlock_light: theme === 'light',
            infoBlock_dark: theme === 'dark',
          })}
          >
            <div className={cx('artistInfo', `artistInfo_${theme}`)}>
              <span className={cx('infoBlock_padding')}>
                {artistInfo.yearsOfLife ? artistInfo.yearsOfLife : ''}
              </span>

              <div
                className={cx('artistNameContainer', {
                  artistNameContainer_light: theme === themes.light,
                  artistNameContainer_dark: theme === themes.dark,
                })}
              >
                <span className={cx('artistName')}>{artistInfo.name || ''}</span>
              </div>
            </div>
            <div className={cx('dash', `dash_${theme}`)}>
              <img src={theme === themes.light ? dashLight : dashDark} alt="dash" width="30px" />
            </div>
            <div className={cx('artistDescription', {
              artistDescription_readMore: artistInfo.description?.length >= 256 && isReadMoreMode,
            })}
            >
              {artistInfo.description?.length >= 256 && !isReadMoreMode
                ? `${artistInfo.description?.slice(0, 256)}...`
                : artistInfo.description
                                || ''}
            </div>

            <div className={cx('learnMoreButton')}>
              <Button
                value={isReadMoreMode ? 'read less' : 'read more'}
                width="200px"
                type="outlined"
                theme={theme}
                callback={() => setReadMoreMode(!isReadMoreMode)}
                disabled={artistInfo.description?.length <= 265}
              />
              <button
                className={cx('buttonInvisible')}
                type="button"
                onClick={() => {
                  setReadMoreMode(!isReadMoreMode);
                }}
                disabled={artistInfo.description?.length <= 265}
              >
                <img
                  src={theme === themes.light ? learnMoreIconLight : learnMoreIconDark}
                  alt="learnMoreIcon"
                  width="12px"
                  height="7px"
                  className={cx({
                    readLess: isReadMoreMode,
                  })}
                />
              </button>
            </div>

            <div className={cx('genresBlock')}>
              {artistInfo.genres?.map((g) => (
                <Genre key={g._id} value={g.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;

type NoArtworksPropsType = {
    addArtwork: (value: 'add' | 'edit') => void;
    setAddEditPictureModeOn: (value: boolean) => void;
}
export const NoArtworks: FC<NoArtworksPropsType> = ({ addArtwork, setAddEditPictureModeOn }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={cx('noArtworks', `noArtworks_${theme}`)}>
      <div className={cx('noArtworksContainer')}>
        <img
          src={noImagePlug}
          alt="noImagePlug"
          width="168px"
          height="151px"
        />
        <button
          type="button"
          className={cx('addFirstPictureButton',
            `addFirstPictureButton_${theme}`)}
          onClick={() => {
            addArtwork('add');
            setAddEditPictureModeOn(true);
          }}
        >
          <img
            src={addDark}
            alt="addPicture"
            width="16px"
            height="16px"
          />
        </button>
      </div>
    </div>
  );
};
