import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Genre } from '../../../ArtistProfile/Genre/Genre';

const cx = classNames.bind(style);

export const Multiselect = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const genres = ['Romanticism', 'Art', 'Nature', 'Bataille', 'Realistic'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [crossIconStyle, setIconCrossIconStyle] = useState({ display: 'none' });
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);

  const onCrossIconClick = (e: any) => {
    e.stopPropagation();
    setTitle('');
    setIconCrossIconStyle({ display: 'none' });
  };
  const onAuthorsOptionClick = (id: number) => {
    setIsOpen(false);
    setIconCrossIconStyle({ display: 'block' });
  };
  const onLocationsOptionClick = (id: number) => {
    setIsOpen(false);
    setIconCrossIconStyle({ display: 'block' });
  };

  return (
    <div>
      <div className={cx('label', {
        label__light: theme === 'light',
        label__dark: theme === 'dark',
      })}
      >
        Genres*
      </div>
      <div
        className={cx('multiselect')}
      >
        <div
          className={cx('select__header', {
            input__light: theme === 'light',
            input__dark: theme === 'dark',
            select__header__focus__light: isOpen && theme === 'light',
            select__header__focus__dark: isOpen && theme === 'dark',
          })}
          onClick={() => setIsOpen(!isOpen)}
            // tabIndex={2}
            // onBlur={() => setIsOpen(false)}
          role="button"
          tabIndex={-1}
          onKeyDown={() => {
            console.log('keyboard listener');
          }}
        >
          <div className={cx('genres')}>
            {selectedGenres.map((g) => <Genre value={`${g} x`} key={g} />)}
          </div>
          <div
            className={cx('select__icon')}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            &#9660;
          </div>
        </div>
        <div className={cx('selectBody', {
          selectBody__opened: isOpen,
          selectBody__light: theme === 'light',
          selectBody__dark: theme === 'dark',
        })}
        >
          {
                        genres.map((g, index) => (
                          <div
                            key={g}
                            className={cx('select__item', {
                              select__item__light: theme === 'light',
                              select__item__dark: theme === 'dark',
                            })}
                          >
                            <input
                              className={cx('custom-checkbox')}
                              type="checkbox"
                              id={`checkbox + ${index}`}
                              onClick={() => {
                                if (selectedGenres.find((selectedGenre) => selectedGenre === g)) {
                                  setSelectedGenres(selectedGenres.filter((sg) => sg !== g));
                                } else {
                                  setSelectedGenres([...selectedGenres, g]);
                                }
                              }}
                            />
                            <label htmlFor={`checkbox + ${index}`}>
                              {' '}
                              <div>{g}</div>
                            </label>
                          </div>
                        ))
                    }
        </div>
      </div>
    </div>
  );
};