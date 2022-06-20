import React from 'react';
import classNames from 'classnames/bind';
import style from './Genre.module.scss';

const cx = classNames.bind(style);

export const Genre = (props: { value: string }) => {
  const { value } = props;
  return (
    <div className={cx('genre')}>
      <span className={cx('genreValue', 'genreItem')}>
        {value}
      </span>
    </div>
  );
};
