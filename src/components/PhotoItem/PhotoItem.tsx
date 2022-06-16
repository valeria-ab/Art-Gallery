import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import s from './PhotoItem.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';
import { IAppStore } from '../../store/store';

type PhotoItemPropsType = {
  title: string;
  name: string;
  yearsOfLife: string;
  picture: string;
  id: string;
};

const PhotoItem = ({
  name,
  id,
  title,
  yearsOfLife,
  picture,
}: PhotoItemPropsType) => {
  const [hover, setHover] = useState(false);
  const baseURL = useSelector<IAppStore, string>((state) => state.gallery.baseURL);
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
        <NavLink
          to={`/artists/static/${id}`}
          className={s.table__data__active_packName}
        >
          <img className={s.photoItem__img} src={`${baseURL}${picture}`} alt="mainPicture" />
        </NavLink>

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
