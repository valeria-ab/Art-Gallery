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
    callback?: () => void;
};
export const Button = ({
  value, theme, type, width, callback,
}: ButtonPropsType) => (
  <div
    role="button"
    tabIndex={-1}
    className={cx('button', {
      button__darkMode: theme === 'dark' && type === 'filled',
      button__lightMode: theme === 'light' && type === 'filled',
    })}
    style={{ width }}
    onClick={callback}
    onKeyDown={() => console.log('on click')}
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
