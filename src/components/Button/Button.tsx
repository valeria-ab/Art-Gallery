import React, { useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';

const cx = classNames.bind(style);
type ButtonPropsType = {
  title: string;
  theme: string;
};
export const Button = ({ title, theme }: ButtonPropsType) => {
  const [qqq, setqqq] = useState(1);
  return (
    <div
      className={cx('button', {
        button__darkMode: theme === 'dark',
        button__lightMode: theme === 'light',
      })}
    >
      <span className={cx('value')}>{title}</span>
    </div>
  );
};
