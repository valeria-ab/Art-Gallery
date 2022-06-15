import React from 'react';
import PhotoItem from '../../PhotoItem/PhotoItem';
import s from './UnauthorizedUserPageMain.module.scss';
import { ArtistStaticResponseType } from '../../../utils/api';

type MainBlockPropsType = {
  artists: Array<ArtistStaticResponseType>;
};

export const UnauthorizedUserPageMain = ({ artists }: MainBlockPropsType) => (
  <div className={s.main}>
    {artists.map((a) => (
      <PhotoItem
        key={a._id}
        name={a.name}
        title={a.description}
        yearsOfLife={a.yearsOfLife}
        picture={a.mainPainting.image.src}
      />
    ))}
  </div>
);
