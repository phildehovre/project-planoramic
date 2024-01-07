"use client";

import React, { useEffect, useRef } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import styles from "./Ellipsis.module.scss";
import { capitalize } from "@utils/helpers";

const Ellipsis = ({
  options,
}: {
  options: {
    onOptionClick: () => Promise<void>;
    type?: string;
    label: string;
    url?: string;
  }[];
}) => {
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
      <DotsVerticalIcon
        onClick={() => setOpen(!open)}
        className={styles.ellipsis_btn}
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
                {/* {index !== options.length - 1 && (
                  <hr className={styles.ellipsis_separator} />
                )} */}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Ellipsis;