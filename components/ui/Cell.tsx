import React from "react";
import UpdatableField from "./UpdatableField";

type CellType = {
  value: any;
  type: "template" | "campaign" | "event";
  id: string;
  label: string;
};

const Cell = ({ value, type, id, label }: CellType) => {
  return (
    <UpdatableField
      label={label}
      value={value}
      resourceType={type}
      resourceId={id}
      classnames={["cell", "capitalize"]}
      placeholder={label}
    />
  );
};

export default Cell;
