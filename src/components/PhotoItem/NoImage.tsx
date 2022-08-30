import React, { FC } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import noImagePlug from '../../assets/photoItem/noImagePlug.png';

const cx = classNames.bind(style);

type NoImagePropsType = {
    theme: string;
}
export const NoImage: FC<NoImagePropsType> = ({ theme }) => (
  <div className={cx('noImage',
    `noImage_${theme}`)}
  >
    <img
      className={cx('noImage_img')}
      src={noImagePlug}
      alt="noImage"
      width="65px"
      height="60px"
    />
    <p className={cx('description')}>
      No image uploaded
    </p>
  </div>
);
