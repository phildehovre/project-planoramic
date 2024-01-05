"use client";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "./ResourceTable.module.scss";
import { PlusIcon } from "@radix-ui/react-icons";
import { createEvent } from "@app/actions/eventActions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import classnames from "classnames";

type ResourceTableTypes = {
  events: EventType[];
  resource: ResourceType;
  user: KindeUser;
};

const ResourceTable = ({ events, resource, user }: ResourceTableTypes) => {
  const [phases, setPhases] = useState<(number | undefined)[]>([]);

  useEffect(() => {
    const uniquePhases = Array.from(
      new Set(events.map((event) => event.phase_number).sort())
    );
    setPhases(uniquePhases);
  }, [events]);

  return (
    <div className={styles.table_ctn}>
      {phases.map((phase: number | undefined) => {
        return (
          <React.Fragment key={crypto.randomUUID()}>
            <h1>Phase {phase}</h1>
            <Row data={events[0]} isHeader={true} />
            {events?.map((event: EventType) => {
              if (event.phase_number === phase) {
                return <Row key={event.id} data={event} isHeader={false} />;
              }
            })}
            <button
              onClick={() => createEvent(resource.id, user.id, Number(phase))}
              className={classnames("button", styles.add_phase_button)}
            >
              <PlusIcon />
            </button>
          </React.Fragment>
        );
      })}
      <button
        onClick={() => createEvent(resource.id, user.id, phases.length + 1)}
        className={classnames("button", styles.add_phase_btn)}
      >
        <PlusIcon />
      </button>
      ;
    </div>
  );
};

export default ResourceTable;
