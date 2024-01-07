"use client";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "./ResourceTable.module.scss";
import { PlusIcon } from "@radix-ui/react-icons";
import { createEvent } from "@app/actions/eventActions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import classnames from "classnames";
import Ellipsis from "./Ellipsis";
import {
  handleDeletePhase,
  handleDuplicatePhase,
  handlePublishPhase,
} from "@app/actions/actions";
import { set } from "mongoose";

type ResourceTableTypes = {
  events: EventType[];
  resource: ResourceType;
  user: KindeUser;
};

type PhaseType = {
  phaseNumber: number | undefined;
  rows: EventType[];
  onSelectAll: () => void;
  onRowSelect: (id: string) => void;
  selectedRows: string[];
};

const ResourceTable = ({ events, resource, user }: ResourceTableTypes) => {
  const [phases, setPhases] = useState<(number | undefined)[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {}, [selectedRows]);

  useEffect(() => {
    const uniquePhases = Array.from(
      new Set(events.map((event) => event.phase_number).sort())
    );
    setPhases(uniquePhases);
  }, [events]);

  const handleSelectAllPhaseRows = (phaseNumber: number) => {
    const phaseRows = events.filter(
      (event) => event.phase_number === phaseNumber
    );
    const phaseIds = phaseRows.map((row) => row.id);

    const allSelected = phaseIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows(selectedRows.filter((id) => !phaseIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...prev, ...phaseIds]);
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }

    setSelectedRows(Array.from(newSelectedRows));
  };

  return (
    <div className={styles.table_ctn}>
      {phases.map((phaseNumber: number | undefined) => {
        return (
          <React.Fragment key={crypto.randomUUID()}>
            <Phase
              phaseNumber={phaseNumber}
              rows={events.filter(
                (event) => event.phase_number === phaseNumber
              )}
              onSelectAll={() =>
                handleSelectAllPhaseRows(phaseNumber as number)
              }
              onRowSelect={handleSelectRow}
              selectedRows={selectedRows}
            />
            <button
              onClick={() =>
                createEvent(resource.id, user.id, Number(phaseNumber))
              }
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
    </div>
  );
};

export default ResourceTable;

const Phase = ({
  phaseNumber,
  rows,
  onSelectAll,
  onRowSelect,
  selectedRows,
}: PhaseType) => {
  return (
    <div>
      <span style={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <h1>Phase {phaseNumber}</h1>
        <Ellipsis
          options={[
            {
              label: "duplicate",
              onOptionClick: () => handleDuplicatePhase(phaseNumber),
            },
            {
              label: "delete",
              onOptionClick: () => handleDeletePhase(phaseNumber),
            },
            {
              label: "Push to Calendar",
              onOptionClick: () => handlePublishPhase(phaseNumber),
            },
          ]}
        />
      </span>
      <Row
        data={rows[0]}
        isHeader={true}
        onSelectAll={() => onSelectAll()}
        isSelected={rows
          .map((row) => row.id)
          .every((id) => selectedRows.includes(id))}
      />
      {rows?.map((row: EventType) => {
        return (
          <Row
            key={row.id}
            data={row}
            isHeader={false}
            isSelected={selectedRows.includes(row.id)}
            onRowSelect={() => onRowSelect(row.id)}
          />
        );
      })}
    </div>
  );
};
