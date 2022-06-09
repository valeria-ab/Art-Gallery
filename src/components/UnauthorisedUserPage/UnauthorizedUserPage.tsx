import React from 'react';
import { UnauthorizedUserPageFooter } from './footer/UnauthorizedUserPageFooter';
import { UnauthorizedUserPageHeader } from './header/UnauthorizedUserPageHeader';
import { UnauthorizedUserPageMain } from './main/UnauthorizedUserPageMain';



export const UnauthorizedUserPage = () => {
  return (
    <div>
      <UnauthorizedUserPageHeader />
      <UnauthorizedUserPageMain />
      <UnauthorizedUserPageFooter />
    </div>
  );
}
