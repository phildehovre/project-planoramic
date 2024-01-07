"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import Ellipsis from "./Ellipsis";
import { handleDeleteResource, handlePublishPhase } from "@app/actions/actions";
import { handlePublishCampaign } from "@app/actions/campaignActions";

type ResourceHeaderTypes = {
  id: string;
  type: "template" | "event" | "campaign";
  resource: ResourceType;
};

const ResourceHeader = ({ id, type, resource }: ResourceHeaderTypes) => {
  const options = [
    {
      label: "publish",
      onOptionClick: () => handlePublishCampaign(id),
    },
    {
      label: "delete",
      onOptionClick: () => handleDeleteResource(id),
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
