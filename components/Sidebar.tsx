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

  const handleAddTemplate = async () => {
    if (user) {
      try {
        await create(user.id);
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
            <SidebarSection
              heading={category.heading}
              items={category.items}
              type={category.type}
              key={category.heading + index}
            />
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
        className="sidebar_pull-tab"
        onClick={() => setIsShowing((prev) => !prev)}
      >
        {isShowing ? "<<" : ">>"}
      </div>
      <Modal
        onSave={handleAddTemplate}
        onCancel={() => setDisplayModal("")}
        display={displayModal === "campaigns" || displayModal === "templates"}
      >
        Add {displayModal}
      </Modal>
    </>
  );
};

export default Sidebar;
