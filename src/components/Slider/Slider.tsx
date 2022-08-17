import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
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

const cx = classNames.bind(style);

type PhotoItemPropsType = {
    name: string;
    years: string;
    picture: string;
    id: string;
    theme: string;
    onHover: 'artists' | 'artworks';
    onDeletePictureClick?: (paintingId: string) => void;
    onEditPictureClick?: (mode: 'edit' | 'add') => void
    pictureData?: AuthorPaintingsType
};

const Slider = () => {
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    if (authorId && paintingId) dispatch(getPaintingTC(authorId, paintingId));
  }, []);
  console.log(artworks?.length);
  return (
    <div className={cx('slider')}>
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
      <span className={cx('counter')}>{artworks?.length}</span>
    </div>
  );
};

export default Slider;
