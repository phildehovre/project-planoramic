import React from "react";
import UpdatableField from "./UpdatableField";

type ResourceHeaderTypes = {
  id: string;
  type: "template" | "event" | "campaign";
  resource: ResourceType;
};

const ResourceHeader = ({ id, type, resource }: ResourceHeaderTypes) => {
  return (
    <div>
      <UpdatableField
        label="name"
        value={resource?.name as string}
        resourceType={type}
        resourceId={id}
        classnames={["resource_title"]}
      />
      <UpdatableField
        label="description"
        value={resource?.description as string}
        resourceType={type}
        resourceId={id}
        weight="regular"
        size="1.5em"
        classnames={["resource_description", "italic", "capitalize"]}
        placeholder={`${type} description`}
      />
    </div>
  );
};

export default ResourceHeader;
