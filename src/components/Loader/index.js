import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "./Loader.module.css";

const Spiner = () => {
  return (
    <Loader
      className={style.loader}
      type="Hearts"
      color="#ffb676"
      height={100}
      width={100}
    />
  );
};
export default Spiner;
