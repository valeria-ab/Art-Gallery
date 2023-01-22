import classNames from "classnames/bind";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import cancelDark from "../../assets/cancelDark.png";
import cancelLight from "../../assets/cancelLight.png";
import errorIcon from "../../assets/toastMessage/error_icon.png";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { setAppError } from "../../store/app-reducer";
import { AppDispatch, IAppStore } from "../../store/store";
import style from "./style.scss";

const cx = classNames.bind(style);

export const ToastMessage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const error = useSelector<IAppStore, string>((state) => state.app.error);
  const successMessage = useSelector<IAppStore, string>(
    (state) => state.app.successMessage
  );

  const title = error ? "Error!" : "Success!";
  const onCancelClick = () => {
    dispatch(setAppError({ error: "" }));
  };
  return (
    <div className={cx("toastMessage_wrapper")}>
      <div
        className={cx("toastMessage", `toastMessage_${theme}`, {
          toastMessage_error: error,
          toastMessage_success: successMessage,
        })}
      >
        <div className={cx("toastMessage_container")}>
          <button
            type="button"
            className={cx("toastMessage_button")}
            onClick={onCancelClick}
          >
            <img
              src={theme === themes.dark ? cancelDark : cancelLight}
              alt="cancelIcon"
              width="16px"
              height="16px"
            />
          </button>

          <div className={cx("toastMessage_contentBlock")}>
            <div className={cx("toastMessage_contentBlock_imgBlock")}>
              {error && (
                <img
                  src={errorIcon}
                  alt="errorIcon"
                  width="16px"
                  height="16px"
                />
              )}
            </div>
            <div>
              <span
                className={cx("toastMessage_title", {
                  toastMessage_title_error: error,
                  toastMessage_title_success: successMessage,
                })}
              >
                {title}
              </span>
              <p className={cx("toastMessage_text")}>
                {error || successMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
