import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import styles from "./Dropdown.module.scss";

const DropdownMenuDemo = ({
  options,
  onOptionClick,
}: {
  options: any;
  onOptionClick: (type: string) => void;
}) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customize options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          {options.map((option: any) => {
            if (!option.submenu) {
              return (
                <DropdownMenu.Item
                  className={styles.DropdownMenuItem}
                  key={crypto.randomUUID()}
                >
                  {option.label} <div className={styles.RightSlot}>⌘+T</div>
                </DropdownMenu.Item>
              );
            }
            return (
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger
                  className={styles.DropdownMenuSubTrigger}
                >
                  {option.label}
                  <div className={styles.RightSlot}>
                    <ChevronRightIcon />
                  </div>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className={styles.DropdownMenuSubContent}
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    {option.submenu.values.map((value: any) => {
                      return (
                        <DropdownMenu.Item
                          className={styles.DropdownMenuItem}
                          key={crypto.randomUUID()}
                        >
                          Phase {value}
                          <div className={styles.RightSlot}>⌘+S</div>
                        </DropdownMenu.Item>
                      );
                    })}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>
            );
          })}

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
              More Tools
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                {options.submenu?.map((option: any) => {
                  <DropdownMenu.Item
                    className={styles.DropdownMenuItem}
                    key={crypto.randomUUID()}
                  >
                    {option.label}
                    <div className={styles.RightSlot}>⌘+S</div>
                  </DropdownMenu.Item>;
                })}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          {/* <DropdownMenu.Separator className={styles.DropdownMenuSeparator} /> */}

          {/* ... other items ... */}

          {/* <DropdownMenu.Separator className={styles.DropdownMenuSeparator} /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
