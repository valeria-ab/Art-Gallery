import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
// @ts-ignore
import style from './style.scss';
import { setCurrentPainting, updateMainPaintingTC } from '../../store/artistPage-reducer';
import cogwheel from '../../assets/photoItem/cogwheel.png';
import noImagePlug from '../../assets/photoItem/noImagePlug.png';
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
    onHover: 'artists' | 'artworks';
    onDeletePictureClick?: (paintingId: string) => void;
    setSliderVisible?: (value: boolean) => void;
    onEditPictureClick?: (mode: 'edit' | 'add') => void
    pictureData?: AuthorPaintingsType
};

const PhotoItem = ({
  name,
  id,
  years,
  picture,
  theme,
  onHover,
  onDeletePictureClick,
  onEditPictureClick,
  setSliderVisible,
  pictureData,
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
      className={cx('photoItem__container', {
        'photoItem__container-active': hover && onHover === 'artists',
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => {
        console.log('onFocus');
      }}
    >
      {isInitialized && (
        <>
          <div
            className={cx('displayNone', {
              displayBlock: hover && onHover === 'artworks',
            })}
          >
            <div
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
              role="button"
              tabIndex={-1}
              className={cx({
                settings__hover: hover && onHover === 'artworks',
              })}
              onClick={() => setMenuOpened(!isMenuOpened)}
            >
              <img src={cogwheel} alt="cogwheel" width="24px" height="24px" />
            </div>
            <div className={cx('displayNone', {
              settings__menu: isMenuOpened && onHover === 'artworks',
              settings__menu_light: theme === themes.light,
              settings__menu_dark: theme === themes.dark,
            })}
            >
              <div
                className={cx({
                  menuItem: hover && onHover === 'artworks',
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="button"
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
                tabIndex={-1}
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  authorId && dispatch(updateMainPaintingTC(id, authorId));
                }}
              >
                Make the cover
              </div>
              <div
                className={cx({
                  menuItem: hover && onHover === 'artworks',
                  menuItem_light: theme === themes.light,
                  menuItem_dark: theme === themes.dark,
                })}
                role="button"
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
                tabIndex={-1}
                onClick={onEditPainting}
              >
                Edit
              </div>
              <div
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
                role="button"
                tabIndex={-1}
                className={cx({
                  menuItem: hover && onHover === 'artworks',
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
      <NavLink
        to={`/artists/${id}`}
        className={cx('photoItem')}
        onClick={() => {
          if (setSliderVisible) { setSliderVisible(true); }
        }}
      >
          {(picture === 'no image')
            ? <NoImage theme={theme} />
            : (
              <img
                className={cx('photoItem__img', {
                  'photoItem__img-active': hover && onHover === 'artists',
                })}
                src={`${process.env.REACT_APP_BASE_URL}${picture}`}
                alt="mainPicture"
              />
            )}
          <div className={cx('hoverButton', {
            'hoverButton-show': hover,
            hoverButton__dark: theme === themes.dark,
            hoverButton__light: theme === themes.light,
          })}
          >
            <span className={cx('hoverButtonSpan', {
              hoverButtonSpan__dark: theme === themes.dark,
              hoverButtonSpan__light: theme === themes.light,
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
      </NavLink>
  );
};

export default PhotoItem;

type NoImagePropsType = {
    theme: string;
}
export const NoImage: FC<NoImagePropsType> = ({ theme }) => (
  <div className={cx('noImage',
    `noImage_${theme}`)}
  >
    <img
      className={cx('noImage_img')}
      src={noImagePlug}
      alt="noImage"
      width="65px"
      height="60px"
    />
    <p className={cx('description')}>
      No image uploaded
    </p>
  </div>
);
