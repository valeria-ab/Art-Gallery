import React, { useContext, useState } from 'react';
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
    blurHandler: () => void;
    error: string | null;
}

export const Input = ({
  label, type, callback, value, blurHandler, error,
}: InputPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState(false);

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
            type={viewMode ? 'text' : type}
            value={value}
            onChange={(e) => callback(e.currentTarget.value)}
            onBlur={blurHandler}
          />
          {error !== null && <div className={cx('errorMessage')}>{error}</div>}
          {type === 'password' && (
          <span
            onClick={() => setViewMode(!viewMode)}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
            role="button"
            tabIndex={-1}
          >
            <img
              className={cx('view')}
              src={eye}
              alt="eye"
            />
          </span>
          )}
        </label>
      </div>
    </div>
  );
};
