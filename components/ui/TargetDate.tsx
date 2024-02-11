"use client";

import React from "react";
import Modal from "@components/Modal";
import Form from "./Form";
import { updateTargetDate } from "@app/actions/campaignActions";

type TargetDateTypes = {
  display: boolean;
  value: string;
  campaignId: string;
  classNames?: string;
};

const TargetDate = ({
  display,
  value,
  campaignId,
  classNames,
}: TargetDateTypes) => {
  const [displayModal, setDisplayModal] = React.useState(false);

  const handleTargetDateChange = async (formData: FormData) => {
    setDisplayModal(false);
    const input = formData.get("targetDate");
    await updateTargetDate(campaignId, input as string);
  };
  return (
    <>
      <div className={classNames} onClick={() => setDisplayModal(true)}>
        {display && <h1>{value}</h1>}
      </div>
      <Form action={handleTargetDateChange}>
        <Modal
          submit={<button type="submit">Select date</button>}
          display={displayModal}
          onCancel={() => setDisplayModal(false)}
        >
          <input type="date" name="targetDate" id="targetDate" />
        </Modal>
      </Form>
    </>
  );
};

export default TargetDate;
