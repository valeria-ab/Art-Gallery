import React from 'react';
import { useSelector } from 'react-redux';
import s from './ArtistPage.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';
import { IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';

const ArtistProfile = (props: { artistInfo: ArtistResponseType }) => {
  const { artistInfo } = props;

  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );
  return (
    <div className={s.artistProfile}>
      <div className={s.infoBlock}>
        <div className={CommonStyles.h4Heading}>{artistInfo.yearsOfLife}</div>
        <div className={`${CommonStyles.h1Heading} ${s.artistName}`}>
          {artistInfo.name}
        </div>
        <div className={CommonStyles.paragraphBaseLight16}>
          {artistInfo.description}
        </div>
      </div>
      <div className={s.mainPhoto}>
        <img
          // src="https://internship-front.framework.team/images/62a32e09269fa5c416c53d91/original.jpg"
          // src={`${baseURL}${artistInfo.avatar.src}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ArtistProfile;
