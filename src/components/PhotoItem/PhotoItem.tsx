import React, { useState } from 'react';
import s from './PhotoItem.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';

type PhotoItemPropsType = {
  title: string;
  name: string;
  yearsOfLife: string;
  picture: string;
};

const PhotoItem = ({
  name,
  title,
  yearsOfLife,
  picture,
}: PhotoItemPropsType) => {
  const [hover, setHover] = useState(false);
  const baseUrl = 'https://internship-front.framework.team/';
  return (
    <div className={s.photoItem__container}>
      <div
        role="banner"
        tabIndex={-1}
        className={s.photoItem}
        onFocus={() => {
          console.log('onFocus');
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img className={s.photoItem__img} src={`${baseUrl}${picture}`} alt="mainPicture" />
        <div className={s.titleContainer}>
          <div className={s.titleBlock}>
            <div className={CommonStyles.h4Heading}>{name}</div>
            <div className={`${CommonStyles.buttonBold12} ${s.years}`}>
              {yearsOfLife}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
