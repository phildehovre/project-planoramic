"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import Ellipsis from "./Ellipsis";

type ResourceHeaderTypes = {
  id: string;
  type: "template" | "event" | "campaign";
  resource: ResourceType;
};

const ResourceHeader = ({ id, type, resource }: ResourceHeaderTypes) => {
  const options = [
    {
      label: "edit",
      onOptionClick: () => console.log("edit"),
    },
    {
      label: "delete",
      onOptionClick: () => console.log("delete"),
    },
  ];

  return (
    <div>
      <span style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <UpdatableField
          label="name"
          value={resource?.name as string}
          resourceType={type}
          resourceId={id}
          classnames={["resource_title"]}
        />
        <Ellipsis options={options} />
      </span>
      <UpdatableField
        label="description"
        value={resource?.description as string}
        resourceType={type}
        resourceId={id}
        weight="regular"
        classnames={["resource_description", "italic"]}
        placeholder={`${type} description`}
      />
    </div>
  );
};

export default ResourceHeader;
