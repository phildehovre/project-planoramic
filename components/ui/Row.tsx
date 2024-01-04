import React from "react";
import Cell from "./Cell";
import styles from "./Row.module.scss";

type RowType = {
  data: any | any[];
  isHeader: boolean;
};

const Row = ({ data, isHeader }: RowType) => {
  const classnames = isHeader
    ? [styles.row_ctn, styles.headers]
    : [styles.row_ctn];

  const renderCells = () => {
    const keys = Object.keys(data);
    return keys.map((key) => {
      return (
        <Cell
          type={data.type}
          label={key}
          value={isHeader ? key : data[key]}
          key={crypto.randomUUID()}
          id={data.id}
          isHeader={isHeader}
        />
      );
    });
  };

  return <div className={classnames.join(" ")}>{renderCells()}</div>;
};

export default Row;
