"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Modal from "./Modal";
import { createTemplate } from "@app/actions/templateActions";
import SidebarSection from "./SidebarSection";
import Form from "./ui/Form";
import { createCampaign } from "@app/actions/campaignActions";
import { Button } from "@radix-ui/themes";
import { ExitIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { currentUser, useAuth, useUser } from "@clerk/nextjs";
import { get } from "http";

const Sidebar = ({ data }: { data: SidebarTypes[] }) => {
  const [isShowing, setIsShowing] = useState(true);
  const [isExtended, setIsExtended] = useState("");
  const [displayModal, setDisplayModal] = useState("");
  const [formtargetDate, setFormTargetDate] = useState("");
  const [resourceCreationLoading, setResourceCreationLoading] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  console.log(user?.primaryEmailAddress);

  const handleHeadingClick = (heading: string) => {
    setIsExtended((prev) => (prev === heading ? "" : heading));
  };

  const handleCreateResource = async (formData: FormData) => {
    setResourceCreationLoading(true);
    if (displayModal === "template") {
      const name = formData.get("name") as string;
      if (user) {
        try {
          const res = await createTemplate(name, user.id, 1).then((res) => {
            setResourceCreationLoading(false);
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
              setResourceCreationLoading(false);
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
      <div
        className={classnames(
          styles.sidebar_pull_tab,
          isShowing ? styles.open : ""
        )}
        onClick={() => setIsShowing((prev) => !prev)}
      >
        <ExitIcon />
      </div>
      <aside
        role="complementary"
        className={styles.sidebar_ctn + `${isShowing ? "open" : ""}`}
      >
        {data.map((category, index) => {
          return (
            <div
              className={styles.sidebar_category}
              key={category.heading + index}
            >
              <SidebarSection
                heading={category.heading}
                items={category.items}
                type={category.type}
              />
              {category.type !== "settings" && (
                <Button
                  variant={category.type === "template" ? "outline" : "surface"}
                  color={category.type === "template" ? "blue" : "cyan"}
                  onClick={() => setDisplayModal(category.type)}
                  style={{ cursor: "pointer" }}
                >
                  <PlusCircledIcon />
                  New {category.type}
                </Button>
              )}
            </div>
          );
        })}
        <div className="user-detail">
          <Image
            src={user?.imageUrl || ""}
            alt="user profile picture"
            width={30}
            height={30}
          />
          {/* <p>{user?.primaryEmailAddress}</p> */}
        </div>
      </aside>
      <Form action={handleCreateResource}>
        <Modal
          submit={<button type="submit">Create</button>}
          onCancel={() => setDisplayModal("")}
          display={displayModal === "campaign" || displayModal === "template"}
          isLoading={resourceCreationLoading}
        >
          <h1>Create {displayModal}</h1>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          {displayModal === "campaign" && (
            <>
              <label htmlFor="targetDate">Campaign Deadline: </label>
              <input
                type="date"
                name="targetDate"
                id="targetDate"
                onChange={(e) => setFormTargetDate(e.target.value)}
              />
            </>
          )}
        </Modal>
      </Form>
    </>
  );
};

export default Sidebar;
