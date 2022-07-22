import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Genre, GenreForMultiselect } from '../../../ArtistProfile/Genre/Genre';
import { GenreResponseType } from '../../../../utils/api';

const cx = classNames.bind(style);
type PropsType = {
  genres: GenreResponseType[];
  selectedGenres: Array<GenreResponseType>;
  onGenreClick: (genre: GenreResponseType) => void;
}
export const Multiselect = ({
  genres,
  onGenreClick,
  selectedGenres,
}: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [crossIconStyle, setIconCrossIconStyle] = useState({ display: 'none' });

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
            {selectedGenres.map((g) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <span
                key={g._id}
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
                role="definition"
                onClick={() => onGenreClick(g)}
              >
                <GenreForMultiselect value={`${g.name} x`} />
              </span>
            ))}
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
                            key={g._id}
                            className={cx('select__item', {
                              select__item__light: theme === 'light',
                              select__item__dark: theme === 'dark',
                            })}
                          >
                            <input
                              className={cx('custom-checkbox')}
                              type="checkbox"
                              id={`checkbox + ${index}`}
                              onClick={() => onGenreClick(g)}
                              checked={!!selectedGenres.find((sg) => sg._id === g._id)}
                            />
                            <label htmlFor={`checkbox + ${index}`}>
                              {' '}
                              <div>{g.name}</div>
                            </label>
                          </div>
                        ))
                    }
        </div>
      </div>
    </div>
  );
};
