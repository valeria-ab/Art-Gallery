import React from 'react';
import PhotoItem from '../../PhotoItem/PhotoItem';
import s from './UnauthorizedUserPageMain.module.scss';
import { ArtistResponseType } from '../../../utils/api';

type MainBlockPropsType = {
  artists: Array<ArtistResponseType>;
};

export const UnauthorizedUserPageMain = ({ artists }: MainBlockPropsType) => (
  <div className={s.main}>
    {artists.map((a) => (
      <PhotoItem
        key={a._id}
        id={a._id}
        name={a.name}
        title={a.description}
        yearsOfLife={a.yearsOfLife}
        picture={a.mainPainting.image.src}
      />
    ))}
  </div>
);
