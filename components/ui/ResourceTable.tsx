import React from "react";
import Row from "./Row";

type ResourceTableTypes = {
  events: EventType[];
};

const ResourceTable = ({ events }: any) => {
  const placeholder = "Your event title";
  const headers = Object.keys(events[0]);
  return (
    <div>
      <h1>Table</h1>
      <ul>
        {events?.map((event: EventType) => {
          return <Row key={event.id} data={event} isHeader={false} />;
        })}
      </ul>
    </div>
  );
};

export default ResourceTable;
