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
      <div className={cx('artistArtworks__heading', {
        artistArtworks__heading__light: theme === 'light',
        artistArtworks__heading__dark: theme === 'dark',
      })}
      >
        Artworks
      </div>
      <Gallery
        artworks={currentTableData}
        onAddEditPictureClick={onAddEditPictureClick}
        onDeletePictureClick={onDeletePictureClick}
      />
      <Pagination
        currentPage={currentPage}
        totalCount={artworks?.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
        siblingCount={1}
      />
    </div>
  );
};

export default ArtistArtworks;
