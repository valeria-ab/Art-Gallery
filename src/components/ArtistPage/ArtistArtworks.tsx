import React, { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import type { AuthorPaintingsType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import { IAppStore } from '../../store/store';
// @ts-ignore
import style from './ArtistPage.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Pagination } from '../Pagination/Pagination';
import { PageSize } from '../../constants';
import { NoArtworks } from './ArtistProfile/ArtistProfile';

const cx = classNames.bind(style);

type ArtistArtworksPropsType = {
    onAddEditPictureClick: (mode: 'edit' | 'add') => void;
    onDeletePictureClick: (paintingId: string) => void;
}

const ArtistArtworks = ({
  onAddEditPictureClick,
  onDeletePictureClick,
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return artworks && artworks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, artworks]);

  return (
    <div className={cx('artistArtworks')}>
      <div className={cx('artistArtworks_heading', {
        artistArtworks_heading_light: theme === 'light',
        artistArtworks_heading_dark: theme === 'dark',
      })}
      >
        Artworks
      </div>
      <Gallery
        artworks={currentTableData}
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
      />
      {artworks?.length > 0 && (
      <Pagination
        currentPage={currentPage}
        totalCount={artworks?.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        siblingCount={1}
      />
      )}
      {/* {artworks?.length < 1 && ( */}
      {/* <> */}
      {/*  <NoArtworks /> */}
      {/*  <div className={cx('breakLineContainer')}> */}
      {/*    <div className={cx('breakLine', `breakLine_${theme}`)} /> */}
      {/*  </div> */}
      {/*  <div className={cx('noArtworksDescription')}> */}
      {/*    The paintings of this artist have not been uploaded yet. */}
      {/*  </div> */}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default ArtistArtworks;
