import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import {
  Navigation, Pagination, Thumbs, Controller,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppDispatch, IAppStore } from '../../store/store';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/navigation';
// @ts-ignore
import style from './style.scss';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import {
  getArtistInfoStaticTC,
  getArtistInfoTC,
  getPaintingTC,
} from '../../store/artistPage-reducer';
import { ArtistResponseType, AuthorPaintingsType, SpecifiedPaintingByIdType } from '../../utils/api';
import arrowLeft from '../../assets/slider/arrowLeft.png';
import arrowRight from '../../assets/slider/arrowRight.png';
import cancel from '../../assets/slider/cancel.png';
import editIconLight from '../../assets/slider/editIconLight.png';
import editIconDark from '../../assets/slider/editIconDark.png';
import deleteIconDark from '../../assets/slider/deleteIconDark.png';
import deleteIconLight from '../../assets/slider/deleteIconLight.png';
import { ThemeContext, themes } from '../../contexts/ThemeContext';

type ItemsType = {
  index?: number;
}
const cn = classNames.bind(style);

type SliderPropsType = {
  // setSliderVisible: () => void;
}

const Slider: FC<SliderPropsType> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authorId, paintingId } = useParams();
  const photoForSlider = useSelector<IAppStore, SpecifiedPaintingByIdType>(
    ({ artistPage }) => artistPage.photoForSlider,
  );
  const artistInfo = useSelector<IAppStore, ArtistResponseType>(
    ({ artistPage }) => artistPage.artistInfo,
  );
  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings,
  );
  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );
  const slides = [];
  const [items, setItems] = useState<Array<AuthorPaintingsType & ItemsType>>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  // const [slide, setSlide] = useState(1);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
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
  }, [authorId, isInitialized]);

  // useEffect(() => {
  //   if (authorId && paintingId) dispatch(getPaintingTC(authorId, paintingId));
  //   const item = items.find((i) => i._id === photoForSlider._id);
  //   if (item?.index) {
  //     setCurrentIndex(item.index);
  //   }
  // }, [authorId, paintingId, items]);

  useEffect(() => {
    const newArray = artworks?.map((aw, index) => ({ ...aw, index: index + 1 }));
    setItems(newArray);
  }, [artworks]);
  console.log(items);

  return (
  // <Swiper
  //   pagination={{
  //     type: 'fraction',
  //   }}
  //   onSlideChange={(swiper) => {
  //     if (swiper.isEnd) swiper.allowSlideNext = false;
  //     if (!swiper.isEnd) swiper.allowSlideNext = true;
  //     if (swiper.isBeginning) swiper.allowSlidePrev = false;
  //     if (!swiper.isBeginning) swiper.allowSlidePrev = true;
  //   }}
  //   onSwiper={(swiper) => swiper.slideTo(1, 0, false)}
  //     // tag="section"
  //     // wrapperTag="ul"
  //   thumbs={{ swiper: thumbsSwiper }}
  //   id="main"
  //   modules={[Navigation, Pagination]}
  // >
  //   {artworks?.map((item) => (
  //     <SwiperSlide key={item._id}>
  //       <img src={`https://internship-front.framework.team${item.image.src}`} alt="" />
  //       <div className={cn('swiper__topRow')} slot="container-start">
  //         <button
  //           // className={cn('swiper__btn', { 'swiper__btn--disabled': !isAuth })}
  //           type="button"
  //         >
  //           <span
  //             className={cn('swiper__btnText')}
  //             role="presentation"
  //           >
  //             {item._id === artistInfo?.mainPainting?._id ? 'Remove' : 'Make'}
  //             {' '}
  //             the cover
  //           </span>
  //         </button>
  //         <button
  //           className={cn('swiper__btn')}
  //           type="button"
  //         >
  //           <img src={cancel} alt="" />
  //         </button>
  //       </div>
  //       <div className={cn('swiper__bottomRow')} slot="wrapper-end">
  //         <div className={cn('swiper__description')}>
  //           <div className={cn('swiper__info')}>
  //             <p className={cn('swiper__year')}>{item.yearOfCreation}</p>
  //             <p className={cn('swiper__name')}>{item.name}</p>
  //           </div>
  //           <div className={cn('swiper__bottomButtons')}>
  //             {/* {isAuth && ( */}
  //             {/*  <> */}
  //             {/*    <span className={cn('swiper__bottomBtn')}> */}
  //             {/*      <ButtonEditDelete */}
  //             {/*        variant={EditOrDeleteButton.edit} */}
  //             {/*        transparent */}
  //             {/*        onClick={() => setAddEditPaintingOpened?.(true)} */}
  //             {/*      /> */}
  //             {/*    </span> */}
  //             {/*    <ButtonEditDelete */}
  //             {/*      variant={EditOrDeleteButton.delete} */}
  //             {/*      transparent */}
  //             {/*      onClick={() => { */}
  //             {/*        setDeleteOpened?.(true); */}
  //             {/*        setDeleteArtistOrPainting?.(DeleteArtistOrPainting.painting); */}
  //             {/*        setCurrentPaintingId?.(item._id); */}
  //             {/*      }} */}
  //             {/*    /> */}
  //             {/*  </> */}
  //             {/* )} */}
  //           </div>
  //         </div>
  //       </div>
  //     </SwiperSlide>
  //   ))}
  // </Swiper>
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) swiper.allowSlideNext = false;
          if (!swiper.isEnd) swiper.allowSlideNext = true;
          if (swiper.isBeginning) swiper.allowSlidePrev = false;
          if (!swiper.isBeginning) swiper.allowSlidePrev = true;
        }}
        // onSwiper={(swiper) => swiper.slideTo(1, 0, false)}
      >
        {artworks?.map((aw) => (
          <SwiperSlide key={aw._id}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${aw.image?.original}`}
              alt="image1"
            />
            <div className={cn('canselButton')}>
              <NavLink to={`/artists/${authorId}`} type="button">
                <img src={cancel} height="16px" width="16px" alt="cancel" />
              </NavLink>
            </div>
            <div className={cn('infoBlock', `infoBlock_${theme}`)}>
              {isInitialized && (
              <div className={cn('iconsBlockContainer')}>
                <div className={cn('iconsBlock')}>
                  <button type="button" className={cn('iconsBlock_iconButton')}>
                    <img
                      src={theme === themes.light
                        ? editIconLight
                        : editIconDark}
                      alt="edit"
                      width="16px"
                      height="16px"
                    />
                  </button>
                  <button type="button" className={cn('iconsBlock_iconButton')}>
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
              )}
              <div className={cn('infoBlockContainer', `infoBlockContainer_${theme}`)}>
                <div className={cn('year', `year_${theme}`)}>{aw.yearOfCreation}</div>
                <div className={cn('name', `name_${theme}`)}>{aw.name}</div>
              </div>
            </div>

          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
};

export default Slider;
