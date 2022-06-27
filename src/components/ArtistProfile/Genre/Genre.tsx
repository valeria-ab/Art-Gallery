import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import style from './Genre.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

const cx = classNames.bind(style);

export const Genre = (props: { value: string }) => {
  const { value } = props;
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={(cx('genre', {
      genre__light: theme === 'light',
      genre__dark: theme === 'dark',
    }))}
    >
      <span className={cx('genreValue')}>{value}</span>
    </div>
  );
};
