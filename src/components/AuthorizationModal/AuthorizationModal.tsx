import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import loginPic from "../../assets/modals/authorization/loginPic.png";
import signUpPic from "../../assets/modals/authorization/signUpPic.png";
import cancelIcon from "../../assets/modals/cancelIcon.png";
import { ThemeContext } from "../../contexts/ThemeContext";
import { loginTC, signUpTC } from "../../store/auth-reducer";
import { AppDispatch } from "../../store/store";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./style.scss";

const cx = classNames.bind(style);

type AuthPropsType = {
  title: string;
  text: string;
  linkText: string;
  buttonTitle: string;
  setLogin: (value: boolean) => void;
  setSignUp: (value: boolean) => void;
  login: boolean;
  signUp: boolean;
};

export const Authorization = ({
  setLogin,
  setSignUp,
  linkText,
  text,
  buttonTitle,
  title,
  login,
  signUp,
}: AuthPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("RapGod@mail.ru");
  const [password, setPassword] = useState("RapGod123");
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passError, setPassError] = useState<null | string>(null);


  const blurHandler = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (username.length === 0) {
      setEmailError("The field cannot be empty");
    } else if (!re.test(String(username).toLowerCase())) {
      setEmailError("Invalid Email");
    } else {
      setEmailError(null);
    }
  };
  const passwordBlurHandler = () => {
    if (password.length === 0) {
      setPassError("The field cannot be empty");
    } else if (password.length < 7) {
      setPassError("at least 6 characters");
    } else {
      setPassError(null);
    }
  };

  const onLoginClick = () => {
    setSignUp(false);
    setLogin(true);
  };
  const onSignUpClick = () => {
    setLogin(false);
    setSignUp(true);
  };

  const onSignUpSubmitButtonClick = () => {
    dispatch(signUpTC(username, password));
  };
  const onLoginSubmitButtonClick = () => {
    dispatch(loginTC(username, password));
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("authorization")}>
        <div
          className={cx("authorizationContainer", {
            light: theme === "light",
            dark: theme === "dark",
          })}
        >
          <div className={cx("picture")}>
            <img
              src={linkText === "sign up" ? loginPic : signUpPic}
              alt="authPic"
              width="498px"
            />
          </div>

          <div className={cx("mainBlock")}>
            <div
              className={cx("cancelIconWrapper")}
              onClick={
                buttonTitle === "Log In"
                  ? () => setLogin(!login)
                  : () => setSignUp(!signUp)
              }
              role="button"
              tabIndex={-1}
              onKeyDown={() => {
                console.log("keyboard listener");
              }}
            >
              <img
                src={cancelIcon}
                alt="cancelIcon"
                className={cx("cancelIcon")}
              />
            </div>
            <div
              className={cx("title", {
                dark: theme === "dark",
                title_mobile_light: theme === "light",
              })}
            >
              {title}
            </div>
            <div className={cx("text")}>
              {text} &nbsp;
              <span
                onClick={linkText === "sign up" ? onSignUpClick : onLoginClick}
                className={cx("link", {
                  lightMode: theme === "light",
                  darkMode: theme === "dark",
                })}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  console.log("keyboard listener");
                }}
              >
                {linkText}
              </span>
            </div>
            <Input
              label="Email"
              type="email"
              callback={setUsername}
              value={username}
              blurHandler={blurHandler}
              error={emailError}
            />
            <Input
              label="Password"
              type="password"
              callback={setPassword}
              value={password}
              blurHandler={passwordBlurHandler}
              error={passError}
            />
            <div className={cx("buttonBlock")}>
              <Button
                value={buttonTitle}
                theme={theme}
                type="filled"
                width="200px"
                callback={
                  linkText === "sign up"
                    ? onLoginSubmitButtonClick
                    : onSignUpSubmitButtonClick
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
