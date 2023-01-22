import classNames from 'classnames/bind';
import { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageSize } from '../../constants';
import { ThemeContext } from '../../contexts/ThemeContext';
import { setArtworksCurrentPage } from '../../store/artistPage-reducer';
import { AppDispatch, IAppStore } from '../../store/store';
import type { AuthorPaintingsType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import { Pagination } from '../Pagination/Pagination';
import style from './ArtistPage.scss';

const cx = classNames.bind(style);

type ArtistArtworksPropsType = {
    onAddEditPictureClick: (mode: 'edit' | 'add') => void;
    onDeletePictureClick: (paintingId: string) => void;
    setSliderVisible: (value: boolean) => void;
    setPaintingId: (id: string) => void;
    isMobileMode: boolean;
}

const ArtistArtworks = ({
  onAddEditPictureClick,
  onDeletePictureClick,
  setSliderVisible,
  setPaintingId,
  isMobileMode
}: ArtistArtworksPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings,
  );
  const currentPage = useSelector<IAppStore, number>(
    ({ artistPage }) => artistPage.artworksCurrentPage
  );
  const dispatch = useDispatch<AppDispatch>();

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
        setSliderVisible={setSliderVisible}
        setPaintingId={setPaintingId}
        isMobileMode={isMobileMode}
      />
      {artworks?.length > 0 && (
      <Pagination
        currentPage={currentPage}
        totalCount={artworks?.length}
        pageSize={PageSize}
        onPageChange={(page: number) => dispatch(setArtworksCurrentPage({artworksCurrentPage: page}))}
        siblingCount={1}
      />
      )}
    </div>
  );
};

export default ArtistArtworks;
