import React from 'react';
import { useSelector } from 'react-redux';
import { UnauthorizedUserPageFooter } from './footer/UnauthorizedUserPageFooter';
import UnauthorizedUserPageHeader from './header/UnauthorizedUserPageHeader';
import { UnauthorizedUserPageMain } from './main/UnauthorizedUserPageMain';
import { IAppStore } from '../../store/store';
import { ArtistStaticResponseType } from '../../utils/api';

const UnauthorizedUserPage = () => {
  const artists = useSelector<IAppStore, Array<ArtistStaticResponseType>>(
    (state) => state.gallery.artists,
  );
  return (
    <div>
      <UnauthorizedUserPageHeader />
      <UnauthorizedUserPageMain artists={artists} />
      <UnauthorizedUserPageFooter />
    </div>
  );
};

export default UnauthorizedUserPage;
