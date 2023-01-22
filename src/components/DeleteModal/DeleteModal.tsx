import classNames from "classnames/bind";
import React from "react";
import style from "./style.scss";
import { Button } from "../Button/Button";
import trashIcon from "../../assets/modals/trashIcon.png";
import cancelIcon from "../../assets/modals/cancelIcon.png";

const cx = classNames.bind(style);

type ModalPropsType = {
  theme: string;
  primaryTitle: "artist profile" | "picture";
  secondaryTitle: "profile" | "picture";
  cancelCallback: () => void;
  onDeleteCallback: () => void;
};
export const DeleteModal = ({
  theme,
  primaryTitle,
  secondaryTitle,
  cancelCallback,
  onDeleteCallback,
}: ModalPropsType) => (
  <div className={cx("modal")}>
    <div
      className={cx("deleteModal", {
        light: theme === "light",
        dark: theme === "dark",
      })}
    >
      <div
        className={cx("cancelIconWrapper")}
        onClick={cancelCallback}
        onKeyDown={() => {
          console.log("keyboard listener");
        }}
        role="button"
        tabIndex={-1}
      >
        <img src={cancelIcon} alt="cancelIcon" className={cx("cancelIcon")} />
      </div>
      <div className={cx("modalContainer")}>
        <div>
          <img src={trashIcon} alt="trashIcon" className={cx("trashIcon")} />
        </div>
        <div
          className={cx("question", {
            light: theme === "light",
            dark: theme === "dark",
          })}
        >
          Do you want to delete this {primaryTitle}?
        </div>
        <div
          className={cx("warning", {
            light: theme === "light",
            warning__dark: theme === "dark",
          })}
        >
          You will not be able to recover this {secondaryTitle} afterwards.
        </div>
        <div className={cx("buttons")}>
          <Button
            value="delete"
            theme={theme}
            type="filled"
            width="200px"
            callback={onDeleteCallback}
          />
          <Button
            value="cancel"
            theme={theme}
            type="outlined"
            width="200px"
            callback={cancelCallback}
          />
        </div>
      </div>
    </div>
  </div>
);
