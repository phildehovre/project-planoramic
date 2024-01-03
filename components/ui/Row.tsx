import React from "react";
import Cell from "./Cell";

type RowType = {
  data: any | any[];
  isHeader: boolean;
};

const Row = ({ data, isHeader }: RowType) => {
  const renderCells = () => {
    const keys = Object.keys(data);
    console.log(data);
    return keys.map((key) => {
      return (
        <Cell
          type={data.type}
          label={key}
          value={data[key]}
          key={crypto.randomUUID()}
          id={data.id}
        />
      );
    });
  };
  console.log(data);

  return <div>{renderCells()}</div>;
};

export default Row;
