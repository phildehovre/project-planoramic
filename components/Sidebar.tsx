"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Modal from "./Modal";
import { createTemplate } from "@app/actions/templateActions";
import SidebarSection from "./SidebarSection";
import Form from "./ui/Form";
import { createCampaign } from "@app/actions/campaignActions";

const Sidebar = ({ data }: { data: SidebarTypes[] }) => {
  const [isShowing, setIsShowing] = useState(true);
  const [isExtended, setIsExtended] = useState("");
  const [displayModal, setDisplayModal] = useState("");
  const { user } = useKindeBrowserClient();

  const handleHeadingClick = (heading: string) => {
    setIsExtended((prev) => (prev === heading ? "" : heading));
  };

  const handleCreateResource = async (formData: FormData) => {
    if (displayModal === "template") {
      const name = formData.get("name") as string;
      if (user) {
        try {
          const res = await createTemplate(name, user.id, 1).then((res) => {
            setDisplayModal("");
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (displayModal === "campaign") {
      const name = formData.get("name") as string;
      const targetDate = formData.get("targetDate");
      if (user) {
        try {
          const res = await createCampaign(user.id, name, targetDate).then(
            (res) => {
              setDisplayModal("");
              console.log(res);
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
      <aside
        role="complementary"
        className={styles.sidebar_ctn + `${isShowing ? "open" : ""}`}
      >
        {data.map((category, index) => {
          return (
            <React.Fragment key={category.heading + index}>
              <SidebarSection
                heading={category.heading}
                items={category.items}
                type={category.type}
              />
              {category.type !== "settings" && (
                <button onClick={() => setDisplayModal(category.type)}>
                  New {category.type}
                </button>
              )}
            </React.Fragment>
          );
        })}
        <div className="user-detail">
          <Image
            src={user?.picture || ""}
            alt="user profile picture"
            width={30}
            height={30}
          />
          <p>{user?.email}</p>
        </div>
      </aside>
      <div
        className={styles.sidebar_pull_tab}
        onClick={() => setIsShowing((prev) => !prev)}
      >
        {isShowing ? "<<" : ">>"}
      </div>
      <Form action={handleCreateResource}>
        <Modal
          submit={<button type="submit">Create</button>}
          onCancel={() => setDisplayModal("")}
          display={displayModal === "campaign" || displayModal === "template"}
        >
          <h1>Create {displayModal}</h1>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          {displayModal === "campaign" && (
            <>
              <label htmlFor="targetDate">Campaign Deadline: </label>
              <input type="date" name="targetDate" id="targetDate" />
            </>
          )}
        </Modal>
      </Form>
    </>
  );
};

export default Sidebar;
