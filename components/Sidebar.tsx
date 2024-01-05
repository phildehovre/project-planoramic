"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { Infer } from "next/dist/compiled/superstruct";
import Link from "next/link";
import Modal from "./Modal";
import { create } from "@app/actions/templateActions";
import SidebarSection from "./SidebarSection";

const Sidebar = ({ data }: { data: SidebarTypes[] }) => {
  const [isShowing, setIsShowing] = useState(true);
  const [isExtended, setIsExtended] = useState("");
  const [displayModal, setDisplayModal] = useState("");
  const { user } = useKindeBrowserClient();

  const handleHeadingClick = (heading: string) => {
    setIsExtended((prev) => (prev === heading ? "" : heading));
  };

  const handleCreateTemplate = async () => {
    if (user) {
      try {
        await create(user.id, 1);
        setDisplayModal("");
      } catch (err) {
        console.log(err);
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
      <Modal
        onSave={handleCreateTemplate}
        onCancel={() => setDisplayModal("")}
        display={displayModal === "campaign" || displayModal === "template"}
      >
        Add {displayModal}
      </Modal>
    </>
  );
};

export default Sidebar;
