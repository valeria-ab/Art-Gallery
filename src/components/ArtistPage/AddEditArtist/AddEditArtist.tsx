import classNames from "classnames/bind";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import userIcon from "../../../assets/modals/addEditArtist/userIcon.png";
import { ThemeContext } from "../../../contexts/ThemeContext";
import useDebounce from "../../../hooks/useDebounce";
import { setAppError } from "../../../store/app-reducer";
import { createArtistTC } from "../../../store/artistPage-reducer";
import { AppDispatch } from "../../../store/store";
import { GenreResponseType, genresAPI } from "../../../utils/api";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Multiselect } from "./Multiselect/Multiselect";
import style from "./style.scss";

const cx = classNames.bind(style);

type PropsType = {
  onCancelCallback: (value: boolean) => void;
  artistName?: string;
  artistYearsOfLife?: string;
  artistDescription?: string;
  avatar?: string;
  mode: "add" | "edit";
  authorId?: string;
  artistGenres?: Array<GenreResponseType>;
  isMobileMode: boolean;
};

export const AddEditArtist = ({
  onCancelCallback,
  artistName,
  artistYearsOfLife,
  artistDescription,
  avatar,
  mode,
  authorId,
  artistGenres,
  isMobileMode,
}: PropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [srcFieldError, setSrcFieldError] = useState("");
  const [nameFieldError, setNameFieldError] = useState("");
  const [yearsOfLifeFieldError, setYearsOfLifeFieldError] = useState("");
  const [descriptionFieldError, setDescriptionFieldError] = useState("");

  const [name, setName] = useState(artistName || "");
  const [yearsOfLife, setYearsOfLife] = useState(artistYearsOfLife || "");
  const [description, setDescription] = useState(artistDescription || "");
  const [genresList, setGenresList] = useState<GenreResponseType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<
    Array<GenreResponseType>
  >(artistGenres || []);

  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState<File>();
  const [src, setSrc] = useState<string>();


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
    if (
      selectedGenres.find((selectedGenre) => selectedGenre._id === genre._id)
    ) {
      setSelectedGenres(selectedGenres.filter((sg) => sg._id !== genre._id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (!src) {
      setSrcFieldError("The field is required");
    } else {
      if (image) {
        formData.append("avatar", image);
      } else {
        avatar && formData.append("mainPainting", avatar);
      }
    }
    if (!name) {
      setNameFieldError("The field is required");
    } else {
      formData.append("name", name);
    }
    if (!yearsOfLife) {
      setYearsOfLifeFieldError("The field is required");
    } else {
      formData.append("yearsOfLife", yearsOfLife);
    }
    if (!description) {
      setDescriptionFieldError("The field is required");
    } else {
      formData.append("description", description);
    }

    selectedGenres.forEach((item) => formData.append("genres", item._id));

    if (mode === "edit" && authorId) {
      if (
        artistName !== name ||
        artistYearsOfLife !== yearsOfLife ||
        artistDescription !== description ||
        image ||
        selectedGenres !== artistGenres
      ) {
        // Back-end  не поддерживает функцию обновления
        // dispatch(updateArtistTC(authorId, formData));

        dispatch(
          setAppError({
            error: "🤪 Back-end  не поддерживает функцию обновления((",
          })
        );
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 4000);
      }
      onCancelCallback(false);
    }

    if (image && name && yearsOfLife && description && mode === "add") {
      dispatch(createArtistTC(formData));
      onCancelCallback(false);
    }
  };

  if (name && nameFieldError) setNameFieldError("");
  if (src && srcFieldError) setSrcFieldError("");
  if (description && descriptionFieldError) setDescriptionFieldError("");
  if (yearsOfLife && yearsOfLifeFieldError) setYearsOfLifeFieldError("");

  useEffect(() => {
    if (avatar) setSrc(`${process.env.REACT_APP_BASE_URL}${avatar}`);
  }, [avatar]);

  useEffect(() => {
    genresAPI.getGenres().then((res) => {
      setGenresList(res.data);
    });
    !isMobileMode && (document.body.style.overflow = "hidden")
    return () => {
      !isMobileMode && (document.body.style.overflow = "auto")
    };
  }, [isMobileMode]);



  return (
    <div className={cx("addEditArtistModalBackground")}>
      <div
        className={cx("addEditArtistModal", {
          light: theme === "light",
          dark: theme === "dark",
        })}
      >
        {drag ? (
          <div
            className={cx("drop_area")}
            onDragStart={(e) => dragHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <div className={cx("drop_infoBlock")}>
              <img
                className={cx("userIcon")}
                src={userIcon}
                alt="userIcon"
                height="60px"
                width="60px"
              />
              <div className={cx("dropAreaTitle")}>Drop your image here</div>
              <div
                className={cx("description", {
                  description_dark: theme === "dark",
                })}
              >
                Upload only .jpg or .png format less than 3 MB
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cx("addEditArtistContainer")}
            onDragStart={(e) => dragHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <div
              role="button"
              tabIndex={-1}
              className={cx("cancel")}
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
            <div className={cx("wrapper")}>
              <div>
                <label htmlFor="input_uploader">
                  <div
                    className={cx("photoBlock", {
                      photoBlock_imageAdded: image || avatar,
                    })}
                  >
                    {image || avatar ? (
                      <img src={src} alt="avatar" width="100%" height="100%" />
                    ) : (
                      <>
                        <img
                          className={cx("userIcon")}
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
                    className={cx("input_uploader")}
                  />
                  <span
                    className={cx(
                      "browseImageButton",
                      `browseImageButton_${theme}`
                    )}
                  >
                    Browse Profile Photo
                  </span>
                </label>
                <p style={{ color: "red" }}>{srcFieldError}</p>
              </div>
              <div className={cx("wrap")}>
                <div className={cx("contentContainer")}>
                  <div
                    className={cx("inputsBlock", {
                      inputsBlock__light: theme === "light",
                      inputsBlock__dark: theme === "dark",
                    })}
                  >
                    <Input
                      label="Name"
                      type="text"
                      callback={setName}
                      error={nameFieldError}
                      propsValue={name}
                    />

                    <Input
                      label="Years of life"
                      type="text"
                      callback={setYearsOfLife}
                      error={yearsOfLifeFieldError}
                      propsValue={yearsOfLife}
                    />

                    <TextArea value={description} callback={setDescription} />
                    <p style={{ color: "red" }}>{descriptionFieldError}</p>
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
};
const TextArea = ({ value, callback }: TextAreaPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [description, setDescription] = useState(value || "");
  const onKeyUp = useDebounce(() => callback(description), 500);
  return (
    <label className={cx("addEditArtistTextAreaWrapper")}>
      <div className={cx("label")}>Description</div>
      <textarea
        className={cx("addEditArtistTextArea", {
          addEditArtistTextArea__light: theme === "light",
          addEditArtistTextArea__dark: theme === "dark",
        })}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        onKeyUp={onKeyUp}
      />
    </label>
  );
};
