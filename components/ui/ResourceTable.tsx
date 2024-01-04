"use client";
import React from "react";
import Row from "./Row";
import styles from "./ResourceTable.module.scss";
import { PlusIcon } from "@radix-ui/react-icons";
import { createEvent } from "@app/actions/eventActions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

type ResourceTableTypes = {
  events: EventType[];
  resource: ResourceType;
  user: KindeUser;
};

const ResourceTable = ({ events, resource, user }: ResourceTableTypes) => {
  const placeholder = "Your event title";
  // const headers = Object.keys(events[0]);
  return (
    <div className={styles.table_ctn}>
      <Row data={events[0]} isHeader={true} />
      {events?.map((event: EventType) => {
        return <Row key={event.id} data={event} isHeader={false} />;
      })}
      <button onClick={() => createEvent(resource.id, user.id)}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default ResourceTable;
