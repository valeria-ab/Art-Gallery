import React from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';

const cx = classNames.bind(style);
type ButtonPropsType = {
    value: string;
  theme: string;
    type: 'filled' | 'outlined';
    width: string;
};
export const Button = ({
  value, theme, type, width,
}: ButtonPropsType) => (
  <div
    className={cx('button', {
      button__darkMode: theme === 'dark' && type === 'filled',
      button__lightMode: theme === 'light' && type === 'filled',
    })}
    style={{ width }}
  >
    <span
      className={cx('value', {
        outlined: value === 'cancel',
        outlined__light: theme === 'light' && type === 'outlined',
      })}
    >
      {value}
    </span>
  </div>
);
