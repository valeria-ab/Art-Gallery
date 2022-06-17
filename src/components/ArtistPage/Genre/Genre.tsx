import React from 'react';
import CommonStyles from '../../../common/styles/CommonStyles.module.scss';
import s from './Genre.module.scss';

export const Genre = (props: { value: string }) => {
  const { value } = props;
  return (
    <div className={s.genre}>
      <span className={`${CommonStyles.paragraphSmallMedium12} ${s.genreItem}`}>
        {value}
      </span>
    </div>
  );
};
