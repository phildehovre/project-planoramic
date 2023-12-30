// components/Spinner.js
import React, { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import "./Spinner.scss";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color={"#36D7B7"}
      loading={loading}
      cssOverride={override}
      size={150}
      className="spinner"
    />
  );
};

export default Spinner;
