import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
import style from './style.scss';
import { setCurrentPainting, updateMainPaintingTC } from '../../store/artistPage-reducer';
import cogwheel from '../../assets/photoItem/cogwheel.png';
import { AuthorPaintingsType } from '../../utils/api';
import arrow from '../../assets/photoItem/arrow.png';
import { themes } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

type PhotoItemPropsType = {
    name: string;
    years: string;
    picture: string;
    id: string;
    theme: string;
    onDeletePictureClick?: (paintingId: string) => void;
    setSliderVisible?: (value: boolean) => void;
    onEditPictureClick?: (mode: 'edit' | 'add') => void
    setPaintingId?: (id: string) => void;
    pictureData?: AuthorPaintingsType
};

const PhotoItem = ({
  name,
  id,
  years,
  picture,
  theme,
  onDeletePictureClick,
  onEditPictureClick,
  setSliderVisible,
  pictureData,
  setPaintingId,
}: PhotoItemPropsType) => {
  const [hover, setHover] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();

  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );

  const onEditPainting = () => {
    if (pictureData) dispatch(setCurrentPainting({ currentPainting: pictureData }));
    if (onEditPictureClick) onEditPictureClick('edit');
  };

  return (
    <div
      role="presentation"
      className={cx('photoItem_container')}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => console.log('onFocus')}
    >
      {isInitialized && (
        <>
          <div
            className={cx('displayNone', {
              displayBlock: hover,
            })}
          >
            <div
              role="presentation"
              tabIndex={-1}
              className={cx({
                settings__hover: hover,
              })}
              onClick={() => setMenuOpened(!isMenuOpened)}
            >
              <img src={cogwheel} alt="cogwheel" width="24px" height="24px" />
            </div>
            <div className={cx('displayNone', {
              settings_menu: isMenuOpened,
              settings_menu_light: theme === themes.light,
              settings_menu_dark: theme === themes.dark,
            })}
            >
              <div
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="presentation"
                tabIndex={-1}
                onClick={() => {
                  if (authorId) dispatch(updateMainPaintingTC(id, authorId));
                }}
              >
                Make the cover
              </div>
              <div
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="presentation"
                tabIndex={-1}
                onClick={onEditPainting}
              >
                Edit
              </div>
              <div
                role="presentation"
                tabIndex={-1}
                className={cx({
                  menuItem: hover,
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                onClick={() => onDeletePictureClick && onDeletePictureClick(id)}
              >
                Delete
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={cx('photoItem')}
        role="presentation"
        onClick={() => {
          if (setSliderVisible && setPaintingId) {
            setPaintingId(id);
            setSliderVisible(true);
          }
        }}
      >
        <img
          className={cx('photoItem_img')}
          src={`${process.env.REACT_APP_BASE_URL}${picture}`}
          alt="mainPicture"
        />
        <div className={cx('hoverButton', {
          'hoverButton-show': hover,
          hoverButton_dark: theme === themes.dark,
          hoverButton_light: theme === themes.light,
        })}
        >
          <span className={cx('hoverButtonSpan', {
            hoverButtonSpan_dark: theme === themes.dark,
            hoverButtonSpan_light: theme === themes.light,
          })}
          >
            Learn more
          </span>
        </div>

        <div className={cx('titleContainer', `titleContainer_${theme}`)}>
          <div className={cx('titleBlock', `titleBlock_${theme}`)}>
            <div className={cx('name', `name_${theme}`)}>
              {name}
            </div>
            <div className={cx('years', `years_${theme}`)}>
              {years}
            </div>
          </div>
          <div className={cx('learnMore_mobile', `learnMore_mobile_${theme}`)}>
            <img src={arrow} alt="arrow" width="16px" height="10px" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default PhotoItem;
