import React, {
  ChangeEvent, FormEvent, useContext, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// @ts-ignore
import style from './style.scss';
import userIcon from '../../../assets/modals/addEditArtist/userIcon.png';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import plug from '../../../assets/modals/addPicture/plug.png';
import { addNewPaintingTC } from '../../../store/artistPage-reducer';
import { AppDispatch } from '../../../store/store';

const cx = classNames.bind(style);

type PropsType = {
    setAddPictureModeOn: (value: boolean) => void
    addPictureModeOn: boolean
}
export const AddPicture = ({
  setAddPictureModeOn,
  addPictureModeOn,
}: PropsType) => {
  const [name, setName] = useState('');
  const [yearOfCreation, setYear] = useState('');
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState<File>();
  const [src, setSrc] = useState<string | ArrayBuffer | null>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);
  const { authorId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  // const formData = new FormData();
  // console.log(formData);
  // formData.append('name', name);
  // formData.append('yearOfCreation', yearOfCreation);
  // formData.append('image', imageBlob, 'image.png');
  // artistsGenres.forEach((item) => formData.append('genres', item._id));
  // formData.append('avatar', picture as File);
  // if (name && artistsGenres.length !== 0) createArtist(formData);
  // setAddEditArtistOpened(false);

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const newFile = e.target.files && e.target.files[0];
    if (newFile) {
      setImage(newFile);
      reader.onloadend = () => {
        // console.log(reader.result);
        setSrc(reader.result);
        // dispatch(changeProfilePhoto(reader.result))
      };
      reader.readAsDataURL(newFile);
    }
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
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
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setDrag(false);
  };

  const onSubmit = () => {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', image);
    formData.append('name', name);
    formData.append('yearOfCreation', yearOfCreation);

    if (authorId) dispatch(addNewPaintingTC(authorId, formData));
    setAddPictureModeOn(!addPictureModeOn);
  };

  // @ts-ignore
  return (
    <div className={cx('modal')}>
      <div className={cx('addPictureModal', {
        light: theme === 'light',
        dark: theme === 'dark',
      })}
      >
        <div
          className={cx('cancel')}
          onClick={() => setAddPictureModeOn(!addPictureModeOn)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322
              1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241
              15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608
              15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931
              0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161
               0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z"
              fill="#9C9C9C"
            />
          </svg>
        </div>

        <div className={cx('addPictureContainer')}>
          <div className={cx('addPicture_inputsBlock')}>
            <Input label="The name of the picture" type="text" callback={setName} error={null} />
            <Input label="Year Of Creation" width="105px" type="text" callback={setYear} error={null} />
          </div>
          <div
            className={cx('pictureBlock')}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            {image ? (<img src={src} alt="" width="100%" />)
              : (
                <div className={cx('picture__place')}>
                  <img src={plug} alt="choosePhoto" width="130px" height="130px" />
                  <p>
                    Drop your image here, or
                    <br />

                    <input
                      type="file"
                      ref={inRef}
                      id="input_uploader"
                      onChange={(e) => upload(e)}
                      accept=".jpg, .jpeg, .png"
                      className={cx('input_uploader')}
                    />
                    <label htmlFor="input_uploader">
                      {' '}
                      <span className={cx('browse')}>browse</span>
                    </label>

                  </p>
                  <p className={cx('description')}>Upload only .jpg or .png format less than 3 MB </p>
                </div>
              )}
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
  );
};
