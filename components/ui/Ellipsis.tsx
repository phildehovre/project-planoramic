"use client";

import React, { useEffect, useRef } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import styles from "./Ellipsis.module.scss";
import { capitalize } from "@utils/helpers";
import classnames from "classnames";

type EllipsisTypes = {
  options: {
    onOptionClick: () => Promise<void>;
    type?: string;
    label: string;
    url?: string;
  }[];
  Icon: React.JSXElementConstructor<any>;
  active?: boolean;
  showing?: boolean;
};

const Ellipsis = ({ options, Icon, active, showing = true }: EllipsisTypes) => {
  const [open, setOpen] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      <Icon
        onClick={() => setOpen(!open)}
        className={classnames(
          styles.ellipsis_btn,
          active ? styles.active : styles.inactive
        )}
      />
      {open && (
        <div ref={inputRef} className={styles.ellipsis_dropdown}>
          {options.map((option, index) => {
            return (
              <React.Fragment key={option.label}>
                <div
                  className={styles.ellipsis_dropdown_item}
                  onClick={option.onOptionClick}
                >
                  {capitalize(option.label)}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Ellipsis;
