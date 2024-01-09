"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import Ellipsis from "./Ellipsis";
import { handleDeleteResource, handlePublishPhase } from "@app/actions/actions";
import { handlePublishCampaign } from "@app/actions/campaignActions";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

type ResourceHeaderTypes = {
  id: string;
  type: "template" | "event" | "campaign";
  resource: ResourceType;
};

const ResourceHeader = ({ id, type, resource }: ResourceHeaderTypes) => {
  const options = [
    {
      label: "Publish template",
      type: "publish",
    },
    {
      type: "delete",
      label: "Delete template",
    },
  ];

  const handleResourceOptionsClick = (type: string) => {
    if (type === "delete")
      handleDeleteResource(id).then((res) => {
        console.log(res);
      });
  };

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
        <Dropdown
          options={options}
          Icon={DotsHorizontalIcon}
          onOptionClick={handleResourceOptionsClick}
        />
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
