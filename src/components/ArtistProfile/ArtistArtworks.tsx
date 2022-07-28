import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import { AppDispatch, IAppStore } from '../../store/store';
// @ts-ignore
import style from './ArtistPage.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { setArtworksCurrentPage, setArtworksCurrentPagesPortion } from '../../store/artistPage-reducer';
import { Pagination } from '../Pagination/Pagination';

const cx = classNames.bind(style);

type PropsType = {
    onAddEditPictureClick: (mode: 'edit' | 'add') => void;
    // addEditPictureModeOn: boolean;
    onDeletePictureClick: (paintingId: string) => void;
}

const PageSize = 10;

const ArtistArtworks = ({
  onAddEditPictureClick,
  // addEditPictureModeOn,
  onDeletePictureClick,
}: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    (state) => state.artistPage.artistInfo.paintings,
  );
  const [currentPagesPortion, setCurrentPagesPortion] = useState(1);

  const [artworksPortion, setArtworksPortion] = useState([] as Array<AuthorPaintingsType>);

  const artworksPortionSize = useSelector<IAppStore, number>(
    (state) => state.artistPage.artworksPortionSize,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return artworks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // const artworksCurrentPagesPortion = useSelector<IAppStore, number>(
  //   (state) => state.artistPage.artworksCurrentPagesPortion,
  // );
  // const artworksCurrentPage = useSelector<IAppStore, number>(
  //   (state) => state.artistPage.artworksCurrentPage,
  // );

  const accessToken = useSelector<IAppStore, string>(
    (state) => state.auth.accessToken,
  );

  const artworksCurrentPortion = artworks && artworks.slice(
    artworksPortionSize * currentPagesPortion - artworksPortionSize,
    artworksPortionSize * currentPagesPortion,
  );
  console.log(artworksCurrentPortion);

  useEffect(() => {
    setArtworksPortion(artworksCurrentPortion);
  }, [artworks, currentPage, currentPagesPortion]);

  useEffect(() => {
    dispatch(setArtworksCurrentPagesPortion({ artworksCurrentPagesPortion: 1 }));
  }, []);

  return (
    <div className={cx('artistArtworks')}>
      <div className={cx('artistArtworks__heading', {
        artistArtworks__heading__light: theme === 'light',
        artistArtworks__heading__dark: theme === 'dark',
      })}
      >
        Artworks
      </div>
      <Gallery
        artworks={artworksPortion}
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
      />
      {/* <Pagination */}
      {/*  currentPagesPortion={currentPagesPortion} */}
      {/*  setCurrentPage={setCurrentPage} */}
      {/*  setCurrentPagesPortion={setCurrentPagesPortion} */}
      {/* /> */}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={artworks.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ArtistArtworks;
