import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { IAppStore } from '../../store/store';
// @ts-ignore
import style from './style.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

type PhotoItemPropsType = {
    title: string;
    name: string;
    yearsOfLife: string;
    picture: string;
    id: string;
};

const PhotoItem = ({
  name,
  id,
  title,
  yearsOfLife,
  picture,
}: PhotoItemPropsType) => {
  const [hover, setHover] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const baseURL = useSelector<IAppStore, string>(
    (state) => state.gallery.baseURL,
  );
  return (
    <div
      className={cx('photoItem__container', {
        'photoItem__container-active': hover,
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => {
        console.log('onFocus');
      }}
    >
      <NavLink to={`/artists/static/${id}`} className={cx('photoItem')}>
        <img
          className={cx('photoItem__img', {
            'photoItem__img-active': hover,
          })}
          src={`${baseURL}${picture}`}
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
              {yearsOfLife}
            </div>
          </div>
        </div>

      </NavLink>
    </div>
  );
};

export default PhotoItem;
