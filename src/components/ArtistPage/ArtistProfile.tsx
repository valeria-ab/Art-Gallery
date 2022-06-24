import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './ArtistPage.scss';
import { IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { Genre } from './Genre/Genre';

const cx = classNames.bind(style);

const ArtistProfile = (props: { artistInfo: ArtistResponseType }) => {
  const { artistInfo } = props;

  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );

  return (
    <div className={cx('artistProfile')}>
      {artistInfo.avatar && (
        <>
          <div className={cx('infoBlock')}>
            <div className={cx('artistInfo')}>
              <span className={cx('infoBlock__padding')}>
                {artistInfo.yearsOfLife}
              </span>
            </div>
            <div className={cx('artistNameContainer')}>
              <span className={cx('artistName')}>
                {artistInfo.name}
              </span>
            </div>
            <div className={cx('artistDescription')}>
              <span className={cx('infoBlock__padding')}>
                {artistInfo.description}
              </span>
            </div>
            <div>
              {artistInfo.genres.map((g) => (
                <Genre key={g._id} value={g.name} />
              ))}
            </div>
          </div>

          <div className={cx('mainPhoto')}>
            <img
              // src="https://internship-front.framework.team/images/62a32e09269fa5c416c53d91/original.jpg"
              // src={`${baseURL}${artistInfo.avatar.src2x}`}
              alt="artist_picture"
              // width="1000px"
              height="1001px"
              className={cx('profilePicture')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProfile;
