import React from "react";
import Cell from "./Cell";

type RowType = {
  data: {} | any[];
  isHeader: boolean;
};

const Row = ({ data, isHeader }: RowType) => {
  const renderCells = () => {
    const keys = Object.keys(data);
    console.log(keys);
    return keys.map((key) => {
      return <Cell value={key} />;
    });
  };

  const renderHeaders = () => {
    if (isHeader) {
      return data.map((key: string) => {
        return (
          <Cell
            type="template"
            value={key}
            id="header"
            label={key}
            key={crypto.randomUUID()}
          />
        );
      });
    }
  };

  return <div>{isHeader ? renderHeaders() : renderCells()}</div>;
};

export default Row;
