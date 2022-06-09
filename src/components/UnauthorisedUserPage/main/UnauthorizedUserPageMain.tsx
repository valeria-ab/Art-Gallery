import React from 'react';
import PhotoItem from '../../PhotoItem/PhotoItem';
import s from './UnauthorizedUserPageMain.module.scss'



export const UnauthorizedUserPageMain = () => {
  return (
    <div className={s.main}>
      UnauthorizedUserPageMain
      <PhotoItem/>
    </div>
  );
}
