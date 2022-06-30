import React, { useContext } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import eye from '../../assets/modals/authorization/eye.png';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

type InputPropsType = {
    label: string;
    type: string;
    callback: (value: string) => void;
    value: string;
}

export const Input = ({
  label, type, callback, value,
}: InputPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cx('inputContainer')}>
      <div className={cx({ passwordInput: type === 'password' })}>
        <label htmlFor="">
          <div className={cx('label')}>
            {label}
            {' '}
          </div>
          <input
            className={cx('input', {
              input__light: theme === 'light',
              input__dark: theme === 'dark',
            })}
            type={type}
            value={value}
            onChange={(e) => callback(e.currentTarget.value)}
          />
          {type === 'password' && <img className={cx('view')} src={eye} alt="eye" />}
        </label>
      </div>
    </div>
  );
};
