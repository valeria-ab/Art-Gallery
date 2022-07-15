import React, {
  ChangeEvent, FormEvent, useContext, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
// @ts-ignore
import style from './style.scss';
import userIcon from '../../../assets/modals/addEditArtist/userIcon.png';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import plug from '../../../assets/modals/addPicture/plug.png';
import { addNewPaintingTC } from '../../../store/artistPage-reducer';

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
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);
  const { authorId } = useParams();

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // у таргета files всегда массив, даже если инпуту не поставлен multiply там всего 1 файл
    const newFile = e.target.files && e.target.files[0];
    if (newFile) {
      reader.onloadend = () => {
        setImage(reader.result);
        // dispatch(changeProfilePhoto(reader.result))
      };
      reader.readAsDataURL(newFile);
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('yearOfCreation', yearOfCreation);
    console.log(formData);
  };

  // const formData = new FormData();
  // console.log(formData);
  // formData.append('name', name);
  // formData.append('yearOfCreation', yearOfCreation);
  // formData.append('image', imageBlob, 'image.png');
  // artistsGenres.forEach((item) => formData.append('genres', item._id));
  // formData.append('avatar', picture as File);
  // if (name && artistsGenres.length !== 0) createArtist(formData);
  // setAddEditArtistOpened(false);

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
    console.log(file);
    setDrag(false);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('yearOfCreation', yearOfCreation);
    console.log(formData);
    // axios.post('url', formData)
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImage({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
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
            onDragStart={(e) => dragHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <img src={plug} alt="choosePhoto" width="130px" height="130px" />
            <p>
              Drop your image here, or
              <br />
              {' '}
              <span className={cx('browse')}>browse</span>
            </p>
            <p className={cx('description')}>Upload only .jpg or .png format less than 3 MB </p>
          </div>
          {/* <Button */}
          {/*  value="Save" */}
          {/*  theme={theme} */}
          {/*  type="filled" */}
          {/*  width="200px" */}
          {/*  callback={() => { */}
          {/*    if (authorId) { */}
          {/*      addNewPaintingTC(authorId, { name, yearOfCreation }); */}
          {/*    } */}
          {/*  }} */}
          {/* <input */}
          {/*  type="file" */}
          {/*  ref={inRef} */}
          {/*  id="input_uploader" */}
          {/*  onChange={(e) => upload(e)} */}
          {/*  accept=".jpg, .jpeg, .png" */}
          {/* /> */}
          <form id="formElem" onSubmit={onSubmit}>
            <input type="text" name="firstName" value="John" />
            Картинка:
            {' '}
            <input type="file" name="image" accept="image/*" />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
