import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { log } from 'util';
import { AppDispatch, IAppStore } from '../../store/store';
// @ts-ignore
import style from './style.scss';
import {
  getArtistInfoStaticTC,
  getArtistInfoTC,
  getPaintingTC,
  setCurrentPainting,
} from '../../store/artistPage-reducer';
import { AuthorPaintingsType, SpecifiedPaintingByIdType } from '../../utils/api';
import arrowLeft from '../../assets/slider/arrowLeft.png';
import arrowRight from '../../assets/slider/arrowRight.png';
import cancel from '../../assets/slider/cancel.png';
import editIconLight from '../../assets/slider/editIconLight.png';
import editIconDark from '../../assets/slider/editIconDark.png';
import deleteIconDark from '../../assets/slider/deleteIconDark.png';
import deleteIconLight from '../../assets/slider/deleteIconLight.png';
import { ThemeContext, themes } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

const Slider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authorId, paintingId } = useParams();
  const photoForSlider = useSelector<IAppStore, SpecifiedPaintingByIdType>(
    ({ artistPage }) => artistPage.photoForSlider,
  );
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings,
  );
  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );

  // const [items, setItems] = useState<AuthorPaintingsType[]>([]);
  // const [slide, setSlide] = useState(1);

  const [currentIndex, setCurrentIndex] = useState<number>();
  const [currentItem, setCurrentItem] = useState<AuthorPaintingsType>({} as AuthorPaintingsType);

  useEffect(() => {
    if (authorId) {
      if (!isInitialized) {
        dispatch(getArtistInfoStaticTC(authorId));
      }
      if (isInitialized) {
        dispatch(getArtistInfoTC(authorId));
      }
    }
  }, [authorId, isInitialized, currentItem]);

  // useEffect(() => {
  //   const currentIndex = artworks?.find((artwork) => artwork._id === photoForSlider._id)?._id;
  //   if (authorId && paintingId) dispatch(getPaintingTC(authorId, paintingId));
  //   let sortedPictures = [] as AuthorPaintingsType[];
  //   if (currentIndex) {
  //     for (let i = +currentIndex; i < items.length; i += 1) {
  //       sortedPictures = [...sortedPictures, artworks[i]];
  //     }
  //     for (let i = +currentIndex; i = 0; i -= 1) {
  //       sortedPictures = [...sortedPictures, artworks[i]];
  //     }
  //     setShowedItem(sortedPictures);
  //   }
  // }, [artworks]);

  useEffect(() => {
    if (authorId && paintingId) dispatch(getPaintingTC(authorId, paintingId));
    if (authorId) {
      if (!isInitialized) {
        dispatch(getArtistInfoStaticTC(authorId));
      }
      if (isInitialized) {
        dispatch(getArtistInfoTC(authorId));
      }
    }
  }, [authorId, paintingId]);
  useEffect(() => {
    const bla = artworks?.find(
      (artwork) => artwork._id === photoForSlider._id,
    );
    setCurrentIndex(Number(bla?._id));
    bla && console.log(bla._id);
  }, [artworks, photoForSlider]);
  useEffect(() => {
    // setItems(artworks);
    if (currentIndex) setCurrentItem(artworks[currentIndex]);
  }, [artworks, currentIndex]);

  // artworks && console.log(currentIndex);

  return (
    <div className={cx('slider')}>
      <div className={cx('canselButton')}>
        <NavLink to={`/artists/${authorId}`} type="button">
          <img src={cancel} height="16px" width="16px" alt="cancel" />
        </NavLink>
      </div>
      <picture className={cx('item')}>
        <source
          srcSet={`${process.env.REACT_APP_BASE_URL}${photoForSlider?.image?.webp}`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${process.env.REACT_APP_BASE_URL}${photoForSlider?.image?.webp2x}`}
          media="(max-width: 1280px)"
        />
        <img
          src={`${process.env.REACT_APP_BASE_URL}${photoForSlider?.image?.original}`}
          alt="painting"
        />
      </picture>
      <span className={cx('counter')}>
        {currentIndex}
        /
        {artworks?.length}
      </span>
      <div className={cx('arrowLeft')}>
        {/* <NavLink */}
        {/*  to={`/artists/${authorId}/paintings/${artworks[currentIndex - 1]?.image._id}`} */}
        {/*  type="button" */}
        {/*  onClick={() => { */}
        {/*    setCurrentIndex(currentIndex - 1); */}
        {/*    // if (currentIndex > 1) setCurrentItem(artworks[currentIndex - 1]); */}
        {/*  }} */}
        {/*  // disabled={currentIndex === 1} */}
        {/* > */}
        <img
          src={arrowLeft}
          alt="arrowLeft"
          width="21px"
          height="34px"
        />
        {/* </NavLink> */}
      </div>
      <div className={cx('arrowRight')}>
        <button
          type="button"
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
            if (currentIndex < artworks?.length) setCurrentItem(artworks[currentIndex + 1]);
          }}
          disabled={currentIndex === artworks?.length}
        >
          <img
            src={arrowRight}
            alt="arrowRight"
            width="21px"
            height="34px"
          />
        </button>
      </div>
      <div className={cx('infoBlock', `infoBlock_${theme}`)}>
        <div className={cx('iconsBlockContainer')}>
          <div className={cx('iconsBlock')}>
            <button type="button">
              <img
                src={theme === themes.light
                  ? editIconLight
                  : editIconDark}
                alt="edit"
                width="16px"
                height="16px"
              />
            </button>
            <button type="button">
              <img
                src={theme === themes.light
                  ? deleteIconLight
                  : deleteIconDark}
                alt="delete"
                width="16px"
                height="16px"
              />
            </button>
          </div>

        </div>
        <div className={cx('infoBlockContainer', `infoBlockContainer_${theme}`)}>

          <div className={cx('year', `year_${theme}`)}>{photoForSlider.yearOfCreation}</div>
          <div className={cx('name', `name_${theme}`)}>{photoForSlider.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
