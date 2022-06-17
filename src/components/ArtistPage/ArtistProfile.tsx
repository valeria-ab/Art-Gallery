import React from 'react';
import { useSelector } from 'react-redux';
import s from './ArtistPage.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';
import { IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { Genre } from './Genre/Genre';

const ArtistProfile = (props: { artistInfo: ArtistResponseType }) => {
  const { artistInfo } = props;

  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );

  return (
    <div className={s.artistProfile}>
      {artistInfo.avatar && (
        <>
          <div className={s.infoBlock}>
            <div className={CommonStyles.h4Heading}>
              <span className={s.infoBlock__padding}>
                {artistInfo.yearsOfLife}
              </span>
            </div>
            <div className={s.artistNameContainer}>
              <span className={`${CommonStyles.h1Heading} ${s.artistName}`}>
                {artistInfo.name}
              </span>
            </div>
            <div className={CommonStyles.paragraphBaseLight16}>
              <span className={s.infoBlock__padding}>
                {artistInfo.description}
              </span>
            </div>
            <div>
              {artistInfo.genres.map((g) => (
                <Genre key={g._id} value={g.name} />
              ))}
            </div>
          </div>

          <div className={s.mainPhoto}>
            <img
              // src="https://internship-front.framework.team/images/62a32e09269fa5c416c53d91/original.jpg"
              // src={`${baseURL}${artistInfo.avatar.src2x}`}
              alt="artist_picture"
              // width="1000px"
              height="1001px"
              className={s.profilePicture}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProfile;
