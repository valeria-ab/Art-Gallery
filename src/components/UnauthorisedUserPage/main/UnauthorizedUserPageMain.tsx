import React from 'react';
import PhotoItem from '../../PhotoItem/PhotoItem';
import s from './UnauthorizedUserPageMain.module.scss'

type MainBlockPropsType = {
    authors: Array<any>
}

export const UnauthorizedUserPageMain = (props: MainBlockPropsType) => {
  return (
    <div className={s.main}>
      <PhotoItem name={"qqq"} title={"fff"}/>
      <PhotoItem name={"qqq"} title={"fff"}/>
      <PhotoItem name={"qqq"} title={"fff"}/>
      <PhotoItem name={"qqq"} title={"fff"}/>
      <PhotoItem name={"qqq"} title={"fff"}/>
      <PhotoItem name={"qqq"} title={"fff"}/>
    </div>
  );
}
