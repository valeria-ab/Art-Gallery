import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
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
      <NavLink to={`/artists/static/${id}`} className={cx('photoItem')}>
        <img
          className={cx('photoItem__img', {
            'photoItem__img-active': hover,
          })}
          src={`${baseURL}${picture}`}
          alt="mainPicture"
        />
        <div className={cx('hoverButton', { 'hoverButton-show': hover })}>
          <span className={cx('hoverButtonSpan')}>Learn more</span>
        </div>

        {!hover
          && (
          <div className={cx('titleContainer')}>
            <div className={cx('titleBlock')}>
              <div className={cx('name')}>{name}</div>
              <div className={cx('years')}>
                {yearsOfLife}
              </div>
            </div>
          </div>
          )}
      </NavLink>
    </div>
  );
};

export default PhotoItem;
