import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { AppDispatch, IAppStore } from '../../store/store';
import { getArtistsStaticTC, getArtistsTC } from '../../store/gallery-reducer';
import { ArtistResponseType } from '../../utils/api';
import { RequestStatusType } from '../../store/app-reducer';
import Gallery from '../Gallery/Gallery';

// eslint-disable-next-line react/display-name
const MainPage = () => {
  console.log('main');

  // const dispatch = useDispatch<AppDispatch>();
  // const isInitialized = useSelector<IAppStore, boolean>(
  //   (state) => state.auth.isInitialized, shallowEqual,
  // );
  // console.log('static', isInitialized);
  // // const accessToken = useSelector<IAppStore, string>(
  // //   (state) => state.auth.accessToken,
  // // );
  // const artists = useSelector<IAppStore, Array<ArtistResponseType>>(
  //   (state) => state.gallery.artists, shallowEqual,
  // );
  // // const loadingStatus = useSelector<IAppStore, RequestStatusType>(
  // //   (state) => state.app.status,
  // // );
  //
  // useEffect(() => {
  //   if (isInitialized) {
  //     dispatch(getArtistsTC());
  //     console.log('auth');
  //   } else {
  //     dispatch(getArtistsStaticTC());
  //     console.log('not auth');
  //   }
  // }, []);
  
  useEffect(() => {
    console.log('mainUseEffect');
  }, []);


  // return <Gallery artists={[]} />;
  return <div>12323</div>;
};

export default MainPage;
