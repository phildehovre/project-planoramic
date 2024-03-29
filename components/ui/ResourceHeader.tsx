"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import { handleDeleteResource, handlePublishPhase } from "@app/actions/actions";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Dropdown from "./Dropdown";
import styles from "./ResourceHeader.module.scss";
import { publishTemplate } from "@app/actions/templateActions";
import Form from "./Form";
import Modal from "@components/Modal";
import { redirect } from "next/navigation";
import { dayjsFormat } from "@utils/helpers";
import TargetDate from "./TargetDate";

type ResourceHeaderTypes = {
  resourceId: string;
  type: "template" | "campaign";
  resource: CampaignType | TemplateType | EventType;
  events?: EventType[];
};

const ResourceHeader = ({
  resourceId,
  type,
  resource,
  events,
}: ResourceHeaderTypes) => {
  const [displayModal, setDisplayModal] = React.useState("");

  const campaignOptions = [
    {
      label: "Publish to Calendar",
      type: "publish_campaign",
    },
    {
      label: "Delete campaign",
      type: "delete",
    },
  ];
  const templateOptions = [
    {
      label: "Publish as campaign",
      type: "publish_template",
    },
    {
      label: "Delete template",
      type: "delete",
    },
  ];
  const options = type === "campaign" ? campaignOptions : templateOptions;

  const handleResourceOptionsClick = (operation: string) => {
    if (operation === "delete")
      handleDeleteResource(type, resourceId).then((res) => {});
    if (operation === "publish_template") {
      setDisplayModal("publish_template");
    }
    if (operation === "publish_campaign") {
      setDisplayModal("publish_campaign");
    }
  };

  const handlePublishTemplate = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const targetDate = formData.get("targetDate");
    const res = await publishTemplate(
      resource.kinde_id,
      name,
      targetDate,
      events as EventType[]
    ).then((res: any) => {
      redirect(`/dashboard/campaign/${res.id}`);
    });
    setDisplayModal("");
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <div className={styles.header_row_left}>
          <UpdatableField
            label="name"
            value={resource?.name as string}
            resourceType={type}
            resourceId={resourceId}
            classnames={["resource_title"]}
          />
          <Dropdown
            options={options}
            Icon={DotsHorizontalIcon}
            onOptionClick={handleResourceOptionsClick}
          />
          <TargetDate
            campaignId={resourceId}
            display={type === "campaign"}
            value={dayjsFormat((resource as CampaignType)?.target_date)}
          />
        </div>
      </div>
      <UpdatableField
        label="description"
        value={resource?.description as string}
        resourceType={type}
        resourceId={resourceId}
        weight="regular"
        classnames={["resource_description", "italic"]}
        placeholder={`${type} description`}
      />
      <Form action={handlePublishTemplate}>
        <Modal
          submit={<button type="submit">Create</button>}
          onCancel={() => setDisplayModal("")}
          display={displayModal === "publish_template"}
        >
          <h1>Publish template as campaign</h1>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="targetDate">Campaign Deadline: </label>
          <input type="date" name="targetDate" id="targetDate" />
        </Modal>
      </Form>
    </div>
  );
};

export default ResourceHeader;
