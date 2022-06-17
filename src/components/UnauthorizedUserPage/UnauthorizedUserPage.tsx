import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnauthorizedUserPageMain } from './main/UnauthorizedUserPageMain';
import { AppDispatch, IAppStore } from '../../store/store';
import { ArtistResponseType } from '../../utils/api';
import { getArtistsTC } from '../../store/gallery-reducer';

const UnauthorizedUserPage = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const artists = useSelector<IAppStore, Array<ArtistResponseType>>(
    (state) => state.gallery.artists,
  );

  useEffect(() => {
    dispatch(getArtistsTC());
  }, []);

  return (
    <div>
      <UnauthorizedUserPageMain artists={artists} />
    </div>
  );
});
// 👇️ set display name
UnauthorizedUserPage.displayName = 'UnauthorizedUserPage';
export default UnauthorizedUserPage;
