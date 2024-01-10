"use client";

import React from "react";
import UpdatableField from "./UpdatableField";
import { handleDeleteResource, handlePublishPhase } from "@app/actions/actions";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Dropdown from "./Dropdown";
import styles from "./ResourceHeader.module.scss";
import dayjs from "dayjs";
import { dayjsFormat } from "@utils/helpers";
import { publish } from "@app/actions/templateActions";
import Form from "./Form";
import Modal from "@components/Modal";

type ResourceHeaderTypes = {
  resourceId: string;
  type: "template" | "event" | "campaign";
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
    if (type === "delete") handleDeleteResource(resourceId).then((res) => {});
    if (type === "publish") {
      setDisplayModal("publish");
    }
  };

  const handlePublishTemplate = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const targetDate = formData.get("targetDate");
    const res = await publish(
      resource.kinde_id,
      name,
      targetDate,
      events as any
    );
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
          <div className={styles.header_row_right}>
            {/* {type === "campaign" && (
              <h1>{dayjsFormat((resource as CampaignType).target_date)}</h1>
            )} */}
          </div>
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
          display={displayModal === "publish"}
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
