import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { AppDispatch, IAppStore } from '../../store/store';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/navigation';
// @ts-ignore
import style from './style.scss';
import {
  getArtistInfoStaticTC,
  getArtistInfoTC,
  setCurrentPainting,
  updateMainPaintingTC,
} from '../../store/artistPage-reducer';
import { ArtistResponseType, AuthorPaintingsType } from '../../utils/api';
import cancel from '../../assets/slider/cancel.png';
import editIconLight from '../../assets/slider/editIconLight.png';
import editIconDark from '../../assets/slider/editIconDark.png';
import deleteIconDark from '../../assets/slider/deleteIconDark.png';
import deleteIconLight from '../../assets/slider/deleteIconLight.png';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { Button } from '../Button/Button';
import removeTheCover from '../../assets/slider/removeTheCover.png';

const cn = classNames.bind(style);

type SliderPropsType = {
    setSliderVisible: (value: boolean) => void;
    onAddEditPictureClick: (mode: 'edit' | 'add') => void;
    onDeletePictureClick: (pictureId: string) => void;
    currentIndex: number;
}

const ArtworksSlider: FC<SliderPropsType> = ({
  setSliderVisible,
  onDeletePictureClick,
  onAddEditPictureClick,
  currentIndex,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authorId, paintingId } = useParams();

  const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
    ({ artistPage }) => artistPage.artistInfo.paintings,
  );
  const mainPainting = useSelector<IAppStore, string>(
    ({ artistPage }) => artistPage.artistInfo.mainPainting._id,
  );

  const isInitialized = useSelector<IAppStore, boolean>(
    ({ auth }) => auth.isInitialized,
  );

  const onEditPainting = (pictureData: AuthorPaintingsType) => {
    dispatch(setCurrentPainting({ currentPainting: pictureData }));
    if (onAddEditPictureClick) onAddEditPictureClick('edit');
  };

  const [paintingIndex, setPaintingIndex] = useState<number>(currentIndex);
  console.log(paintingIndex);
  useEffect(() => setPaintingIndex(currentIndex), [currentIndex]);
  const onMakeTheCoverClick = (id: string) => authorId
      && dispatch(updateMainPaintingTC(id, authorId));

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

  return (
    <>
      <Swiper
        pagination={
                    {
                      type: 'fraction',
                    }
                }
        navigation
        modules={[Pagination, Navigation]}
        // onSwiper={slideTo}
        onSwiper={(swiper) => swiper.slideTo(paintingIndex, 0, false)}
        // onSlideChange={(swiper) => {
        //   if (swiper.isEnd) swiper.allowSlideNext = false;
        //   if (!swiper.isEnd) swiper.allowSlideNext = true;
        //   if (swiper.isBeginning) swiper.allowSlidePrev = false;
        //   if (!swiper.isBeginning) swiper.allowSlidePrev = true;
        // }}
      >
        {
                    artworks?.map((artwork) => (
                      <SwiperSlide key={artwork._id}>
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}${artwork.image?.original}`}
                          alt="image1"
                        />
                        <div className={cn('canselButton')}>
                          <button
                            type="button"
                            onClick={() => setSliderVisible(false)}
                          >
                            <span>
                              <img
                                src={cancel}
                                height="16px"
                                width="16px"
                                alt="cancel"
                              />
                            </span>
                          </button>
                        </div>
                        <div className={cn('removeTheCover')}>
                          <img
                            src={removeTheCover}
                            alt=""
                          />
                          {mainPainting === artwork._id
                            ? (
                              <Button
                                value="remove the cover"
                                type="outlined"
                                theme={themes.dark}
                                width="200px"
                              />
                            )
                            : (
                              <Button
                                value="make the cover"
                                type="outlined"
                                theme={themes.dark}
                                width="200px"
                                callback={() => onMakeTheCoverClick(artwork._id)}
                              />
                            )}
                        </div>
                        <div
                          className={cn('infoBlock', `infoBlock_${theme}`)}
                        >
                          {
                                    isInitialized && (
                                    <div className={cn('iconsBlockContainer')}>
                                      <div className={cn('iconsBlock')}>
                                        <button
                                          type="button"
                                          className={cn('iconsBlock_iconButton')}
                                          onClick={() => onEditPainting(artwork)}
                                        >
                                          <img
                                            src={theme === themes.light
                                              ? editIconLight
                                              : editIconDark}
                                            alt="edit"
                                            width="16px"
                                            height="16px"
                                          />
                                        </button>
                                        <button
                                          type="button"
                                          className={cn('iconsBlock_iconButton')}
                                          onClick={() => onDeletePictureClick(artwork._id)}
                                        >
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
                                    )
                                }
                          <div className={cn('infoBlockContainer', `infoBlockContainer_${theme}`)}>
                            <div className={cn('year', `year_${theme}`)}>
                              {artwork.yearOfCreation}
                            </div>
                            <div
                              className={cn('name', `name_${theme}`)}
                            >
                              {artwork.name}
                            </div>
                          </div>
                        </div>

                      </SwiperSlide>
                    ))
                }
      </Swiper>
    </>
  );
};

export default ArtworksSlider;
