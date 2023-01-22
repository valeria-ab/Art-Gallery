import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.scss";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import { ThemeContext } from "../../../contexts/ThemeContext";
import plug from "../../../assets/modals/addPicture/plug.png";
import {
  addNewPaintingTC,
  editPaintingTC,
} from "../../../store/artistPage-reducer";
import { AppDispatch, IAppStore } from "../../../store/store";
import { AuthorPaintingsType } from "../../../utils/api";

const cx = classNames.bind(style);

type PropsType = {
  setAddPictureModeOn: (value: boolean) => void;
  addPictureModeOn: boolean;
  mode: "edit" | "add";
};
export const AddEditPicture = ({
  setAddPictureModeOn,
  addPictureModeOn,
  mode,
}: PropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);
  const { authorId } = useParams();

  const currentPainting = useSelector<IAppStore, AuthorPaintingsType>(
    (state) => state.artistPage.currentPainting
  );

  const [name, setName] = useState(currentPainting.name || "");
  const [yearOfCreation, setYear] = useState(
    currentPainting.yearOfCreation || ""
  );
  const [width, setWidth] = useState("105px");
  const [nameFieldError, setNameFieldError] = useState("");
  const [yearOfCreationFieldError, setYearOfCreationFieldError] = useState("");
  const [srcFieldError, setSrcFieldError] = useState("");

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
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setDrag(false);
  };

  function displayWindowSize() {
    // функция, которая передаёт ширину инпута для мобильных версий экрана

    const w = document.documentElement.clientWidth;
    window.addEventListener("resize", displayWindowSize);
    if (w <= 768 && w > 500 && width !== "340px") {
      setWidth("340px");
    }
    if (w < 500 && width !== "260px") {
      setWidth("260px");
    }
    if (w > 768 && width !== "105px") {
      setWidth("105px");
    }
  }

  displayWindowSize();

  const onSubmit = () => {
    const formData = new FormData();
    if (!name) {
      setNameFieldError("The field is required");
    } else {
      formData.append("name", name);
    }
    if (!yearOfCreation) {
      setYearOfCreationFieldError("The field is required");
    } else {
      formData.append("yearOfCreation", yearOfCreation);
    }
    if (!src) {
      setSrcFieldError("The field is required");
    } else {
      if (image) {
        formData.append("image", image);
      }
    }

    if (authorId) {
      if (mode === "add" && name && yearOfCreation && image) {
        dispatch(addNewPaintingTC(authorId, formData));
        setAddPictureModeOn(!addPictureModeOn);
      }
      if (mode === "edit" && name && yearOfCreation) {
        dispatch(editPaintingTC(authorId, currentPainting._id, formData));
        setAddPictureModeOn(!addPictureModeOn);
      }
    }
  };

  if (name && nameFieldError) setNameFieldError("");
  if (src && srcFieldError) setSrcFieldError("");
  if (yearOfCreation && yearOfCreationFieldError)
    setYearOfCreationFieldError("");

  useEffect(() => {
    if (currentPainting.image)
      setSrc(`${process.env.REACT_APP_BASE_URL}${currentPainting.image.src}`);
  }, [currentPainting]);

  return (
    <div className={cx("addEditPictureModalBackground")}>
      <div
        className={cx("addEditPictureModal", {
          light: theme === "light",
          dark: theme === "dark",
        })}
      >
        <div
          role="button"
          tabIndex={-1}
          className={cx("cancel")}
          onClick={() => setAddPictureModeOn(!addPictureModeOn)}
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

        <div className={cx("addEditPictureContainer")}>
          <div className={cx("addEditPicture_inputsBlock")}>
            <Input
              label="The name of the picture"
              type="text"
              callback={setName}
              error={nameFieldError}
              propsValue={name}
            />
            <Input
              label="Year Of Creation"
              width={width}
              type="text"
              callback={setYear}
              error={yearOfCreationFieldError}
              propsValue={yearOfCreation}
            />
          </div>
          <div
            className={cx("pictureBlock")}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            {image || currentPainting.image ? (
              <img src={src || ""} alt="" width="100%" height="100%" />
            ) : (
              <>
                <div className={cx("picture__place")}>
                  <img
                    src={plug}
                    alt="choosePhoto"
                    width="130px"
                    height="130px"
                  />
                  <p>
                    Drop your image here, or
                    <br />
                    <input
                      type="file"
                      ref={inRef}
                      id="input_uploader"
                      onChange={(e) => upload(e)}
                      accept=".jpg, .jpeg, .png"
                      className={cx("input_uploader")}
                    />
                    <label htmlFor="input_uploader">
                      {" "}
                      <span className={cx("browse")}>browse</span>
                    </label>
                  </p>
                  <p className={cx("description")}>
                    Upload only .jpg or .png format less than 3 MB{" "}
                  </p>
                </div>
                <p style={{ color: "red" }}>{srcFieldError}</p>
              </>
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
