import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import {
  getArtistsStaticTC,
  getArtistsTC,
  getGenresTC,
  InitialGalleryStateType,
  setCurrentPagesPortion,
  setUrlParams, UrlParamsType,
} from '../../store/gallery-reducer';
import { ArtistResponseType, GenreResponseType } from '../../utils/api';
import Gallery from '../Gallery/Gallery';
import style from './style.scss';
import { AddEditArtist } from '../modals/AddEditArtist/AddEditArtist';
import { Button } from '../Button/Button';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import searchIconLight from '../../assets/mainPageFilters/searchIconLight.png';
import settingsIconLight from '../../assets/mainPageFilters/settingsIconLight.png';
import useDebounce from '../../hooks/useDebounce';

const cx = classNames.bind(style);

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = useSelector<IAppStore, UrlParamsType>((state) => state.gallery.urlParams);

  useEffect(() => {
    dispatch(setUrlParams({ urlParams: Object.fromEntries(searchParams) }));
    dispatch(getArtistsTC({ data: searchParams }));
  }, [searchParams]);

  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized, shallowEqual,
  );
  const {
    portionSize, currentPagesPortion, artists, genres,
  } = useSelector<IAppStore, InitialGalleryStateType>(
    (state) => state.gallery,
  );
  const accessToken = useSelector<IAppStore, string>(
    (state) => state.auth.accessToken,
  );
  const artistsCurrentPortion = artists.slice(
    portionSize * currentPagesPortion - portionSize, portionSize * currentPagesPortion,
  );
  const [isAddArtistMode, setAddArtistMode] = useState(false);
  const [name, setName] = useState('');

  const [artistsPortion, setArtistsPortion] = useState([] as ArtistResponseType[]);
  const [isSettingsMode, setSettingsMode] = useState(true);
  const [chosenGenres, setChosenGenres] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>();
  const prevParams = Object.fromEntries(searchParams);

  const [isGenresFiltersOpened, setGenresFiltersOpened] = useState(false);
  const [isSortByFiltersOpened, setSortByFiltersOpened] = useState(false);

  const onEnterPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      setSearchParams({ ...prevParams, name });
    }
  };
  useEffect(() => {
    if (urlParams.name) setName(urlParams.name);
  }, [urlParams.name]);

  const onShowResults = () => {
    if (order) {
      setSearchParams({
        ...prevParams,
        sortBy: 'name',
        orderBy: order,
        genres: chosenGenres,
      });
    } else {
      delete prevParams.sortBy;
      delete prevParams.orderBy;
      setSearchParams({
        ...prevParams,
        genres: chosenGenres,
      });
    }
  };

  const onLoadMore = () => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: currentPagesPortion + 1 }));
  };

  const onKeyUpHandler = useDebounce(() => {
    if (name) {
      setSearchParams({ ...prevParams, name });
    } else {
      delete prevParams.name;
      setSearchParams({ ...prevParams });
    }
  }, 1000);

  useEffect(() => {
    setArtistsPortion(artistsCurrentPortion);
  }, [artists]);

  useEffect(() => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: 1 }));
  }, []);

  useEffect(() => {
    setArtistsPortion([...artistsPortion, ...artistsCurrentPortion]);
  }, [portionSize, currentPagesPortion]);

  useEffect(() => {
    if (isInitialized) {
      dispatch(getArtistsTC());
    } else {
      dispatch(getArtistsStaticTC());
    }
  }, [isInitialized, accessToken]);

  useEffect(() => {
    dispatch(getGenresTC());
  }, []);

  return (
    <>
      {isAddArtistMode
                && <AddEditArtist onCancelCallback={setAddArtistMode} />}
      {isInitialized && (
        <div className={cx('buttons_wrapper')}>
          <Button
            value="add artist"
            type="outlined"
            theme={theme}
            width="100px"
            callback={() => setAddArtistMode(true)}
          />
          <div className={cx('filterButtons_wrapper')}>
            <div className={cx('searchContainer', {
              searchContainer_dark: themes.dark,
              searchContainer_light: themes.light,
            })}
            >
              <div className={cx('searchIconContainer')}>
                <img
                  src={searchIconLight}
                  alt="searchIcon"
                  className={cx('searchIcon')}
                />
              </div>

              <input
                className={cx('searchContainer_input', {
                  searchContainer_input_light: themes.light,
                  searchContainer_input_dark: themes.dark,
                })}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                onKeyUp={onKeyUpHandler}
                onKeyPress={onEnterPressHandler}
              />
            </div>
            <div style={{ width: '28px', height: '28px', backgroundColor: '' }}>
              <button
                type="button"
                onClick={() => {
                  setSettingsMode(!isSettingsMode);
                }}
              >
                <img
                  src={settingsIconLight}
                  alt="settingsIconLight"
                  style={{
                    width: '16px',
                    height: '13px',
                  }}
                />
              </button>

            </div>
          </div>
        </div>
      )}
      {isSettingsMode && (

        <div className={cx('filtersMenu')}>
          <button
            type="button"
            onClick={() => setSettingsMode(!isSettingsMode)}
          >
            x
          </button>

          <div className={cx('filters_block')}>
            <div>

              <div>
                <button
                  type="button"
                  className={cx('filter_title_button', 'filter_buttons')}
                  onClick={() => setGenresFiltersOpened(!isGenresFiltersOpened)}
                >
                  GENRES
                </button>
              </div>
              {isGenresFiltersOpened && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
                >
                  {genres.map((genre) => (
                    <div
                      className={cx('filter_genreItem', {
                        filter_genreItem_chosen: !!chosenGenres.find((cg) => cg === genre._id),
                      })}
                      key={genre._id}
                      onClick={() => {
                        if (chosenGenres.find((cg) => cg === genre._id)) {
                          setChosenGenres(chosenGenres.filter((cg) => cg !== genre._id));
                        } else {
                          setChosenGenres([...chosenGenres, genre._id]);
                        }
                      }}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '35px' }}>
                <button
                  className={cx('filter_title_button', 'filter_buttons')}
                  onClick={() => setSortByFiltersOpened(!isSortByFiltersOpened)}
                  type="button"
                >
                  SORT BY
                </button>

                <>
                  {isSortByFiltersOpened && (
                  <div className={cx('sortByButtons')}>
                    <div className={cx()}>Recently added</div>
                    <div>
                      {' '}
                      <button
                        className={cx('sortByButtons', 'filter_buttons')}
                        type="button"
                        onClick={() => setOrder('desc')}
                        style={{ color: 'inherit' }}
                      >
                        Z-A
                      </button>
                    </div>

                    <div>
                      <button
                        className={cx('sortByButtons', 'filter_buttons')}
                        style={{ color: 'inherit' }}
                        type="button"
                        onClick={() => setOrder('asc')}
                      >
                        A-Z
                      </button>
                    </div>
                  </div>
                  )}
                </>

              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                value="Show the results"
                type="outlined"
                theme={theme}
                callback={onShowResults}
              />
              <Button
                value="Clear"
                type="outlined"
                theme={theme}
                callback={() => {
                  setSettingsMode(!isSettingsMode);
                }}
              />

            </div>
          </div>
        </div>

      )}
      <Gallery
        artists={artistsPortion}
        onLoadMore={onLoadMore}
      />
    </>
  );
};

export default MainPage;
