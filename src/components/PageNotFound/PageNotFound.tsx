import classNames from "classnames/bind";
import style from "./style.scss";

const cx = classNames.bind(style);

export const PageNotFound = () => {
  return <div className={cx("pageNotFound")}>page not found</div>;
};
