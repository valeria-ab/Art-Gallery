import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import style from './style.scss';
import addLight from '../../assets/buttons/addLight.png';
import addDark from '../../assets/buttons/addDark.png';
import arrowBackLight from '../../assets/buttons/arrowBackLight.png';
import arrowBackDark from '../../assets/buttons/arrowBackDark.png';

const cx = classNames.bind(style);
type ButtonPropsType = {
    value: string;
    theme: string;
    type: 'filled' | 'outlined' | 'add' | 'arrow';
    width?: string;
    callback?: () => void;
    disabled?: boolean;
};
export const Button = ({
  value, theme, type, width, callback, disabled,
}: ButtonPropsType) => (
  <button
    type="button"
    tabIndex={-1}
    className={cx('button', {
      button__darkMode: theme === 'dark' && type === 'filled',
      button__lightMode: theme === 'light' && type === 'filled',
    })}
    style={{ width }}
    onClick={callback}
    disabled={disabled}
  >
    { type === 'add' && (
    <img
      src={theme === 'light' ? addLight : addDark}
      alt="add"
      width="16px"
      height="16px"
    />
    )}
    { type === 'arrow' && (
      <img
        src={theme === 'light' ? arrowBackLight : arrowBackDark}
        alt="add"
        width="16px"
        height="10px"
      />
    )}
    <span
      className={cx('value', {
        outlined__dark: theme === 'dark' && type !== 'filled',
        outlined__light: theme === 'light' && type !== 'filled',
      })}
    >
      {value}
    </span>
  </button>
);
