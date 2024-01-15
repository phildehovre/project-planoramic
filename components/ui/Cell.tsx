"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import styles from "./Cell.module.scss";
import { CampaignHeaders, TemplateHeaders } from "@lib/TableHeaders";

type CellType = {
  value: any;
  type: "template_event" | "campaign_event";
  id: string;
  label: string;
  isHeader: boolean;
};
const Cell = ({ value, type, id, label, isHeader }: CellType) => {
  const headers = type === "template_event" ? TemplateHeaders : CampaignHeaders;
  console.log(headers);
  // Check if label is in TableHeaders
  let headerArray: string[] = [];
  headers.forEach((header) => {
    headerArray.push(header.value);
  });
  if (!headerArray.includes(label)) {
    return;
  }
  // ===================================

  const inputType = (() => {
    switch (label) {
      case "range":
        return "number";
      case "entity":
        return "select";
      case "unit":
        return "select";
      case "date":
        return "date";
      default:
        return "text";
    }
  })();
  return (
    <UpdatableField
      label={label}
      value={value}
      resourceType={type}
      resourceId={id}
      classnames={[styles.cell_ctn, styles[label]]}
      placeholder={label}
      type={inputType}
      isHeader={isHeader}
    />
  );
};

export default Cell;
