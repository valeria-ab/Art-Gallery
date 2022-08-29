import React, {
  ChangeEvent, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import style from './style.scss';
import userIcon from '../../../assets/modals/addEditArtist/userIcon.png';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Multiselect } from './Multiselect/Multiselect';
import { AppDispatch, IAppStore } from '../../../store/store';
import { createArtistTC, updateArtistTC } from '../../../store/gallery-reducer';
import { GenreResponseType, genresAPI, privateInstance } from '../../../utils/api';
import useDebounce from '../../../hooks/useDebounce';

const cx = classNames.bind(style);

type PropsType = {
    onCancelCallback: (value: boolean) => void;
    artistName?: string;
    artistYearsOfLife?: string;
    artistLocation?: string;
    artistDescription?: string;
    avatar?: string;
    mode: 'add' | 'edit';
    authorId?: string;
}

export const AddEditArtist = ({
  onCancelCallback,
  artistName,
  artistYearsOfLife,
  artistLocation,
  artistDescription,
  avatar, mode,
  authorId,
}: PropsType) => {
  const [error, setError] = useState('');
  const [name, setName] = useState(artistName || '');
  const [yearsOfLife, setYearsOfLife] = useState(artistYearsOfLife || '');
  const [country, setCountry] = useState(artistLocation || '');
  const [description, setDescription] = useState(artistDescription || '');
  const [genresList, setGenresList] = useState<GenreResponseType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<GenreResponseType>>([]);
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState<File>();

  const [src, setSrc] = useState<string>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const newFile = e.target.files && e.target.files[0];
    if (newFile) {
      setImage(newFile);
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setDrag(false);
  };

  const onGenreClick = (genre: GenreResponseType) => {
    if (selectedGenres.find((selectedGenre) => selectedGenre._id === genre._id)) {
      setSelectedGenres(selectedGenres.filter((sg) => sg._id !== genre._id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (!image) {
      setError('The field is required');
    } else {
      formData.append('avatar', image);
    }
    if (!name) {
      setError('The field is required');
    } else {
      formData.append('name', name);
    }
    if (!yearsOfLife) {
      setError('The field is required');
    } else {
      formData.append('yearsOfLife', yearsOfLife);
    }
    if (!description) {
      setError('The field is required');
    } else {
      formData.append('description', description);
    }

    // @ts-ignore
    // formData.append('avatar', image);
    // formData.append('name', name);
    // formData.append('yearsOfLife', yearsOfLife);
    // formData.append('description', description);

    selectedGenres.forEach((item) => formData.append('genres', item._id));

    if (image && name && yearsOfLife && description) {
      if (mode === 'add') dispatch(createArtistTC(formData));
      if (mode === 'edit' && authorId) dispatch(updateArtistTC(authorId, formData));
      onCancelCallback(false);
    }
  };

  useEffect(() => {
    if (avatar) setSrc(`${process.env.REACT_APP_BASE_URL}${avatar}`);
  }, [avatar]);

  useEffect(() => {
    genresAPI.getGenres()
      .then((res) => {
        // @ts-ignore
        setGenresList(res.data);
      });
  }, []);

  return (
    <div className={cx('modal')}>
      <div className={cx('addModal', {
        light: theme === 'light',
        dark: theme === 'dark',
      })}
      >
        {drag
          ? (
            <div
              className={cx('drop_area')}
              onDragStart={(e) => dragHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              <div className={cx('drop_infoBlock')}>
                <img
                  className={cx('userIcon')}
                  src={userIcon}
                  alt="userIcon"
                  height="60px"
                  width="60px"
                />
                <div className={cx('dropAreaTitle')}>Drop your image here</div>
                <div className={cx('description', {
                  description_dark: theme === 'dark',
                })}
                >
                  Upload only .jpg or .png format less than 3 MB
                </div>
              </div>
            </div>
          )
          : (
            <div
              className={cx('container')}
              onDragStart={(e) => dragHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              <div
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
                role="button"
                tabIndex={-1}
                className={cx('cancel')}
                onClick={() => onCancelCallback(false)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z"
                    fill="#9C9C9C"
                  />
                </svg>

              </div>
              <div className={cx('wrapper')}>
                <div>
                  <label htmlFor="input_uploader">
                    <div className={cx('photoBlock', {
                      imageAdded: image || avatar,
                    })}
                    >
                      {image || avatar
                        ? (
                          <img
                            src={src}
                            alt="avatar"
                            width="100%"
                            height="100%"
                          />
                        )
                        : (
                          <>
                            <img
                              className={cx('userIcon')}
                              src={userIcon}
                              alt="userIcon"
                              height="60px"
                              width="60px"
                            />
                            <p>You can drop your image here</p>
                          </>
                        )}
                    </div>
                    <input
                      type="file"
                      ref={inRef}
                      id="input_uploader"
                      onChange={(e) => upload(e)}
                      accept=".jpg, .jpeg, .png"
                      className={cx('input_uploader')}
                    />
                    <span className={cx('browseImageButton', `browseImageButton_${theme}`)}>Browse Profile Photo</span>
                  </label>
                  <p style={{ color: 'red' }}>{error}</p>
                </div>
                <div className={cx('wrap')}>
                  <div className={cx('contentContainer')}>
                    <div className={cx('inputsBlock', {
                      inputsBlock__light: theme === 'light',
                      inputsBlock__dark: theme === 'dark',
                    })}
                    >
                      <Input
                        label="Name"
                        type="text"
                        callback={setName}
                        error={null}
                        propsValue={name}
                      />
                      <p style={{ color: 'red' }}>{error}</p>
                      <Input
                        label="Years of life"
                        type="text"
                        callback={setYearsOfLife}
                        error={null}
                        propsValue={yearsOfLife}
                      />
                      <p style={{ color: 'red' }}>{error}</p>
                      <Input
                        label="Location"
                        type="text"
                        callback={setCountry}
                        error={null}
                        propsValue={country}
                      />
                      <TextArea
                        value={description}
                        callback={setDescription}
                      />
                      <p style={{ color: 'red' }}>{error}</p>
                    </div>
                    <Multiselect
                      genres={genresList}
                      onGenreClick={onGenreClick}
                      selectedGenres={selectedGenres}
                    />
                  </div>
                  <Button
                    value="Save"
                    theme={theme}
                    type="filled"
                    width="200px"
                    callback={onSubmit}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
type TextAreaPropsType = {
    value: string;
    callback: (value: string) => void;
}
const TextArea = ({ value, callback }: TextAreaPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [description, setDescription] = useState(value || '');
  const onKeyUp = useDebounce(() => callback(description), 500);
  return (
    <label>
      <div className={cx('label')}>Description</div>
      <textarea
        className={cx('textArea', {
          input__light: theme === 'light',
          input__dark: theme === 'dark',
        })}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        onKeyUp={onKeyUp}
      />
    </label>
  );
};
