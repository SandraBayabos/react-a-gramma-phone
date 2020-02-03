import React from "react";
import Loader from "../images/loading.gif";

const LoadingIndicator = () => {
  return (
    <>
      <img id="loader" src={Loader} alt="loading..." />
    </>
  );
};

export default LoadingIndicator;
