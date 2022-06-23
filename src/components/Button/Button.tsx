import React from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';

const cx = classNames.bind(style);
type ButtonPropsType = {
  title: string;
  theme: string;
};
export const Button = ({ title, theme }: ButtonPropsType) => (
  <div
    className={cx('button', {
      button__darkMode: theme === 'dark' && title !== 'cancel',
      button__lightMode: theme === 'light' && title !== 'cancel',
    })}
  >
    <span className={cx('value', { cancel: title === 'cancel' })}>{title}</span>
  </div>
);
