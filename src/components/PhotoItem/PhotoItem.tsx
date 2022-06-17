import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import s from './PhotoItem.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';
import { IAppStore } from '../../store/store';
// @ts-ignore
import style from './style.scss';

const cx = classNames.bind(style);

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
  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );
  return (
    <div
      className={cx('photoItem__container', {
        'photoItem__container-active': hover,
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => {
        console.log('onFocus');
      }}
    >
      {/* <div */}
      {/*  role="banner" */}
      {/*  tabIndex={-1} */}
      {/*  className={s.photoItem} */}
      {/*  onFocus={() => { */}
      {/*    console.log('onFocus'); */}
      {/*  }} */}
      {/*  onMouseOver={() => setHover(true)} */}
      {/*  onMouseLeave={() => setHover(false)} */}
      {/* > */}
      <NavLink to={`/artists/static/${id}`} className={s.photoItem}>
        <img
          className={cx('photoItem__img', {
            'photoItem__img-active': hover,
          })}
          src={`${baseURL}${picture}`}
          alt="mainPicture"
        />
        <div className={cx('hoverButton', { 'hoverButton-show': hover })}>
          <span className={cx('hoverButtonSpan')}>
            Learn more
          </span>
        </div>
      </NavLink>

      <div className={s.titleContainer}>
        <div className={s.titleBlock}>
          <div className={CommonStyles.h4Heading}>{name}</div>
          <div className={`${CommonStyles.buttonBold12} ${s.years}`}>
            {yearsOfLife}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PhotoItem;
