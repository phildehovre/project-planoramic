"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { Infer } from "next/dist/compiled/superstruct";
import Link from "next/link";
import Modal from "./Modal";
import { create } from "@app/actions/templateActions";

const Sidebar = ({
  data,
}: {
  data: {
    heading: string;
    items: Infer<typeof data>;
  }[];
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const [isExtended, setIsExtended] = useState("");
  const [displayModal, setDisplayModal] = useState("");
  const { user } = useKindeBrowserClient();

  console.log(displayModal);
  const handleHeadingClick = (heading: string) => {
    setIsExtended((prev) => (prev === heading ? "" : heading));
  };

  const renderSidebarContent = () => {
    return data.map((item) => {
      if (item.heading === "Settings") {
        return (
          <ul
            className={styles.sidebar_category}
            key={item.heading}
            onClick={() => handleHeadingClick(item.heading)}
          >
            <h1>
              {item.heading.charAt(0).toUpperCase() + item.heading.slice(1)}
            </h1>
            {isExtended === item.heading &&
              item.items.map((subItem: string) => {
                return (
                  <Link href={subItem} key={subItem}>
                    {subItem}
                  </Link>
                );
              })}
          </ul>
        );
      }
      return (
        <ul className={styles.sidebar_category} key={item.heading}>
          <span>
            <h1 onClick={() => handleHeadingClick(item.heading)}>
              {item.heading.charAt(0).toUpperCase() + item.heading.slice(1)}
            </h1>
            <button onClick={() => setDisplayModal(item.heading)}>
              New {item.heading}
            </button>
          </span>
          {isExtended === item.heading &&
            item.items.map((subItem: ResourceType) => {
              return (
                <Link
                  href={`/dashboard/${item.heading}/${subItem.id}`}
                  key={subItem.id}
                >
                  {subItem.name}
                </Link>
              );
            })}
        </ul>
      );
    });
  };

  return (
    <>
      <aside
        role="complementary"
        className={styles.sidebar_ctn + `${isShowing ? "open" : ""}`}
      >
        <div>{renderSidebarContent()}</div>
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
        onSave={() => setDisplayModal("")}
        onCancel={() => setDisplayModal("")}
        display={displayModal === "campaigns" || displayModal === "templates"}
      >
        Add {displayModal}
      </Modal>
    </>
  );
};

export default Sidebar;
