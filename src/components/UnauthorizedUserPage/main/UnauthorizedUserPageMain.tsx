import React, { useContext } from 'react';
import PhotoItem from '../../PhotoItem/PhotoItem';
import s from './UnauthorizedUserPageMain.module.scss';
import { ArtistResponseType } from '../../../utils/api';
import { ThemeContext } from '../../../contexts/ThemeContext';

type MainBlockPropsType = {
  artists: Array<ArtistResponseType>;
};

export const UnauthorizedUserPageMain = ({ artists }: MainBlockPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={s.main}>
      {artists.map((a) => (
        <PhotoItem
          key={a._id}
          id={a._id}
          name={a.name}
          yearsOfLife={a.yearsOfLife}
          picture={a.mainPainting.image.src}
          theme={theme}
        />
      ))}
    </div>
  );
};
