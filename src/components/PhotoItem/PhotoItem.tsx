import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AppDispatch, IAppStore } from '../../store/store';
// @ts-ignore
import style from './style.scss';
import { deletePaintingTC, setCurrentPainting, updateMainPaintingTC } from '../../store/artistPage-reducer';
import cogwheel from '../../assets/photoItem/cogwheel.png';
import noImagePlug from '../../assets/photoItem/noImagePlug.png';
import { AuthorPaintingsType } from '../../utils/api';

const cx = classNames.bind(style);

type PhotoItemPropsType = {
    name: string;
    years: string;
    picture: string;
    id: string;
    theme: string;
    onHover: 'artists' | 'artworks';
    onDeletePictureClick?: (paintingId: string) => void;
    onEditPictureClick?: () => void
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
  pictureData,
}: PhotoItemPropsType) => {
  const [hover, setHover] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();
  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );

  const onEditPainting = () => {
    if (pictureData) dispatch(setCurrentPainting({ currentPainting: pictureData }));
    if (onEditPictureClick) onEditPictureClick();
  };
  return (
    <div
      className={cx('photoItem__container', {
        'photoItem__container-active': hover && onHover === 'artists',
        // settings__hover: hover && onHover === 'artworks',
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
              settings__menu_light: theme === 'light',
              settings__menu_dark: theme === 'dark',
            })}
            >
              <div
                className={cx({
                  menuItem: hover && onHover === 'artworks',
                  menuItem_light: theme === 'light',
                  menuItem_dark: theme === 'dark',
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
                  menuItem_light: theme === 'light',
                  menuItem_dark: theme === 'dark',
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
                  menuItem_light: theme === 'light',
                  menuItem_dark: theme === 'dark',
                })}
                onClick={() => onDeletePictureClick && onDeletePictureClick(id)}
              >
                Delete
              </div>
            </div>
          </div>
        </>
      )}
      <NavLink to={`/artists/${id}`} className={cx('photoItem')}>
        <img
          className={cx('photoItem__img', {
            'photoItem__img-active': hover && onHover === 'artists',
          })}
          src={picture === 'no image' ? noImagePlug : `${baseURL}${picture}`}
          alt="mainPicture"
        />
        <div className={cx('hoverButton', {
          'hoverButton-show': hover,
          hoverButton__dark: theme === 'dark',
          hoverButton__light: theme === 'light',
        })}
        >
          <span className={cx('hoverButtonSpan', {
            hoverButtonSpan__dark: theme === 'dark',
            hoverButtonSpan__light: theme === 'light',
          })}
          >
            Learn more
          </span>
        </div>

        <div className={cx('titleContainer', {
          titleContainer__dark: theme === 'dark',
          titleContainer__light: theme === 'light',
        })}
        >
          <div className={cx('titleBlock', {
            titleBlock__dark: theme === 'dark',
            titleBlock__light: theme === 'light',
          })}
          >
            <div className={cx('name', {
              name__dark: theme === 'dark',
              name__light: theme === 'light',
            })}
            >
              {name}
            </div>
            <div className={cx('years', {
              years__dark: theme === 'dark',
              years__light: theme === 'light',
            })}
            >
              {years}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default PhotoItem;
