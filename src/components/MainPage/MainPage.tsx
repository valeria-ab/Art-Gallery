import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AppDispatch, IAppStore } from '../../store/store';
import { getArtistsStaticTC, getArtistsTC, setCurrentPagesPortion } from '../../store/gallery-reducer';
import { ArtistResponseType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';

// eslint-disable-next-line react/display-name
const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized, shallowEqual,
  );
  const portionSize = useSelector<IAppStore, number>(
    (state) => state.gallery.portionSize,
  );
  const currentPagesPortion = useSelector<IAppStore, number>(
    (state) => state.gallery.currentPagesPortion,
  );
  const accessToken = useSelector<IAppStore, string>(
    (state) => state.auth.accessToken,
  );
  const artists = useSelector<IAppStore, Array<ArtistResponseType>>(
    (state) => state.gallery.artists, shallowEqual,
  );
  const artistsCurrentPortion = artists.slice(
    portionSize * currentPagesPortion - portionSize, portionSize * currentPagesPortion,
  );

  const [artistsPortion, setArtistsPortion] = useState([] as ArtistResponseType[]);

  useEffect(() => {
    setArtistsPortion(artistsCurrentPortion);
  }, [artists]);

  useEffect(() => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: 1 }));
  }, []);

  useEffect(() => {
    setArtistsPortion([...artistsPortion, ...artistsCurrentPortion]);
  }, [portionSize, currentPagesPortion]);

  const onLoadMore = () => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: currentPagesPortion + 1 }));
  };

  useEffect(() => {
    if (isInitialized) {
      dispatch(getArtistsTC());
    } else {
      dispatch(getArtistsStaticTC());
    }
  }, [isInitialized, accessToken]);

  return <Gallery artists={artistsPortion} onLoadMore={onLoadMore} />;
};

export default MainPage;
