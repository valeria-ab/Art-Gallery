import React, { useContext } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

type InputPropsType = {
    label: string;
}

export const Input = ({ label }: InputPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cx('inputContainer')}>
      <div>
        <label htmlFor="">
          <div>
            {label}
            {' '}
          </div>
          <input className={cx('input')} />
        </label>
      </div>
    </div>
  );
};
