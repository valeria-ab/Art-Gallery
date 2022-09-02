import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import {
  getArtistsStaticTC,
  getArtistsTC, getGenresStaticTC,
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
import cancelLightMode from '../../assets/mainPageFilters/cancelLightMode.png';
import cancelDarkMode from '../../assets/mainPageFilters/cancelDarkMode.png';
import plusIconLight from '../../assets/mainPageFilters/plusIconLight.png';
import plusIconDark from '../../assets/mainPageFilters/plusIconDark.png';
import settingsIconLight from '../../assets/mainPageFilters/settingsIconLight.png';
import settingsIconDark from '../../assets/mainPageFilters/settingsIconDark.png';
import useDebounce from '../../hooks/useDebounce';
import { ToastMessage } from '../ToastMessage/ToastMessage';

const cx = classNames.bind(style);

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = useSelector<IAppStore, UrlParamsType>((state) => state.gallery.urlParams);
  const error = useSelector<IAppStore, string>(
    (state) => state.app.error,
  );

  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized, shallowEqual,
  );
  const {
    portionSize, currentPagesPortion, artists, genres,
  } = useSelector<IAppStore, InitialGalleryStateType>(
    (state) => state.gallery,
  );

  const artistsCurrentPortion = artists.slice(
    portionSize * currentPagesPortion - portionSize, portionSize * currentPagesPortion,
  );
  const [isAddArtistMode, setAddArtistMode] = useState(false);
  // const [name, setName] = useState('');

  const [artistsPortion, setArtistsPortion] = useState([] as ArtistResponseType[]);
  const [isSettingsMode, setSettingsMode] = useState(false);
  const [chosenGenres, setChosenGenres] = useState<string[]>(Array.from(searchParams.getAll('genres')));
  const [order, setOrder] = useState<string | null>(searchParams.get('orderBy'));
  const prevParams = Object.fromEntries(searchParams);

  const [isGenresFiltersOpened, setGenresFiltersOpened] = useState(false);
  const [isSortByFiltersOpened, setSortByFiltersOpened] = useState(false);

  // const onEnterPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.charCode === 13) {
  //     setSearchParams({ ...prevParams, name });
  //   }
  // };

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
  const onClear = () => {
    setChosenGenres([]);
    setOrder(null);
    setSearchParams({});
  };

  const onLoadMore = () => {
    dispatch(setCurrentPagesPortion({ currentPagesPortion: currentPagesPortion + 1 }));
  };

  // const onKeyUpHandler = useDebounce(() => {
  //   if (name) {
  //     setSearchParams({ ...prevParams, name });
  //   } else {
  //     Delete prevParams.name;
  //     setSearchParams({ ...prevParams });
  //   }
  // }, 1000);

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
      dispatch(getGenresTC());
    } else {
      dispatch(getArtistsStaticTC());
      dispatch(getGenresStaticTC());
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized && Object.keys(searchParams).length) {
      dispatch(setUrlParams({ urlParams: Object.fromEntries(searchParams) }));
      dispatch(getArtistsTC({ data: searchParams }));
    }
  }, [searchParams, isInitialized]);

  // useEffect(() => {
  //   if (urlParams.name) setName(urlParams.name);
  // }, [urlParams.name]);

  const status = useSelector<IAppStore, string>(
    (state) => state.app.status,
  );
  if (status === 'loading') {
    return <div>loading...</div>;
  }

  return (
    <>
      {isAddArtistMode
                && (
                <AddEditArtist
                  onCancelCallback={setAddArtistMode}
                  mode="add"
                />
                )}
      {isInitialized && (
        <div className={cx('buttons_wrapper')}>
          <Button
            value="add artist"
            type="add"
            theme={theme}
            width="100px"
            callback={() => setAddArtistMode(true)}
          />
          <div className={cx('filterButtons_wrapper')}>

            <div className={cx('filterInput_wrapper')}>
              <FilterInput />
            </div>
            <div className={cx('settingsIcon')}>
              <button
                className={cx('filter_buttons')}
                type="button"
                onClick={() => {
                  setSettingsMode(!isSettingsMode);
                }}
              >
                <img
                  src={theme === 'light' ? settingsIconLight : settingsIconDark}
                  alt="settingsIconLight"
                  width="16px"
                  height="13px"
                />
              </button>

            </div>
          </div>
        </div>
      )}
      {isSettingsMode && (
        <div className={cx('filtersMenu', `filtersMenu_${theme}`)}>
          <button
            style={{ float: 'right' }}
            className={cx('filter_buttons')}
            type="button"
            onClick={() => setSettingsMode(!isSettingsMode)}
          >
            <img
              width="16px"
              height="16px"
              src={theme === themes.light
                ? cancelLightMode
                : cancelDarkMode}
              alt="cancel"
            />
          </button>

          <div className={cx('filters_block')}>
            <div>
              <div className={cx('filter_title_buttons_wrapper')}>
                <button
                  type="button"
                  className={cx('filter_title_button', 'filter_buttons',
                    `filter_title_button_${theme}`)}
                  onClick={() => setGenresFiltersOpened(!isGenresFiltersOpened)}
                >
                  GENRES
                  {chosenGenres.length > 0 && (
                  <span>
                    (
                    {chosenGenres.length}
                    )
                  </span>
                  )}
                </button>
                <button
                  className={cx('filter_buttons')}
                  type="button"
                  onClick={() => setGenresFiltersOpened(!isGenresFiltersOpened)}
                >
                  <img
                    width="16px"
                    height="16px"
                    src={theme === themes.light
                      ? plusIconLight
                      : plusIconDark}
                    alt="openGenres"
                  />
                </button>
              </div>
              {isGenresFiltersOpened && (
              <div className={cx('genresList')}>
                {genres.map((genre) => (
                  <button
                    type="button"
                    className={cx('filter_genreItem', {
                      filter_genreItem_dark: theme === 'dark',
                      filter_genreItem_dark_chosen: !!chosenGenres.find((cg) => cg === genre._id) && theme === 'dark',
                      filter_genreItem_light_chosen: !!chosenGenres.find((cg) => cg === genre._id) && theme === 'light',
                      filter_genreItem_light: theme === 'light',
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
                  </button>
                ))}
              </div>
              )}

              <div
                style={{ marginTop: '35px' }}
              >
                <div className={cx('filter_title_buttons_wrapper')}>
                  <button
                    className={cx('filter_title_button', 'filter_buttons', {
                      filter_title_button_light: theme === 'light',
                      filter_title_button_dark: theme === 'dark',
                    })}
                    onClick={() => setSortByFiltersOpened(!isSortByFiltersOpened)}
                    type="button"
                  >
                    SORT BY
                    {order && (
                    <span>
                      (
                      {order === 'asc' ? 'a-z' : 'z-a'}
                      )
                    </span>
                    )}
                  </button>
                  <button
                    className={cx('filter_buttons')}
                    type="button"
                    onClick={() => setSortByFiltersOpened(!isSortByFiltersOpened)}
                  >
                    <img
                      width="16px"
                      height="16px"
                      src={theme === themes.light
                        ? plusIconLight
                        : plusIconDark}
                      alt="openSortBy"
                    />
                  </button>
                </div>
                <>
                  {isSortByFiltersOpened && (
                  <div className={cx()}>
                    <div className={cx('filter_genreItem', 'sortByButtons', {
                      filter_genreItem_light: theme === 'light',
                      filter_genreItem_dark: theme === 'dark',
                    })}
                    >
                      Recently added
                    </div>
                    {' '}
                    <button
                      className={cx('filter_buttons',
                        'filter_genreItem',
                        'sortByButtons', {
                          filter_genreItem_light_chosen: order === 'desc' && theme === 'light',
                          filter_genreItem_dark_chosen: order === 'desc' && theme === 'dark',
                          inherit: order !== 'desc',
                          filter_genreItem_light: theme === 'light',
                          filter_genreItem_dark: theme === 'dark',
                        })}
                      type="button"
                      onClick={() => setOrder('desc')}
                    >
                      Z-A
                    </button>

                    <div>
                      <button
                        className={cx(
                          'filter_buttons',
                          'filter_genreItem',
                          'sortByButtons', {
                            filter_genreItem_light_chosen: order === 'asc' && theme === 'light',
                            filter_genreItem_dark_chosen: order === 'asc' && theme === 'dark',
                            inherit: order !== 'asc',
                            filter_genreItem_light: theme === 'light',
                            filter_genreItem_dark: theme === 'dark',
                          },
                        )}
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

            <div className={cx('bottomButtonsBlock')}>
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
                callback={onClear}
              />
            </div>
          </div>
        </div>

      )}
      <Gallery
        artists={artistsPortion}
        onLoadMore={onLoadMore}
      />
      {error && <ToastMessage />}
    </>
  );
};

export default MainPage;

export const FilterInput = () => {
  const [name, setName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const prevParams = Object.fromEntries(searchParams);
  const urlParams = useSelector<IAppStore, UrlParamsType>((state) => state.gallery.urlParams);
  const onEnterPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      setSearchParams({ ...prevParams, name });
    }
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
    if (urlParams.name) setName(urlParams.name);
  }, [urlParams.name]);

  return (
    <div className={cx('searchContainer', `searchContainer_${theme}`)}>
      <div className={cx('searchIconContainer', `searchIconContainer_${theme}`)}>
        <img
          src={searchIconLight}
          alt="searchIcon"
          className={cx('searchIcon')}
        />
      </div>
      <input
        className={cx('searchContainer_input', `searchContainer_input_${theme}`)}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        onKeyUp={onKeyUpHandler}
        onKeyPress={onEnterPressHandler}
        placeholder="Search"
        value={name}
      />
      {name && (
        <button
          type="button"
          onClick={() => {
            setName('');
            delete prevParams.name;
            setSearchParams({ ...prevParams });
          }}
        >
          <img
            src={theme === 'light' ? cancelLightMode : cancelDarkMode}
            alt="clearInput"
            width="8px"
            height="8px"
          />
        </button>
      )}
    </div>
  );
};
