"use client";

"use client";

import React, { useEffect, useRef } from "react";
import "./UpdatableInput.scss";
import { prisma } from "@utils/prisma";

function Field(props: {
  label: string;
  value: string | number | undefined;
  resourceType: "template" | "campaign" | "event";
  size?: string;
  weight?: string;
  resourceId: string;
  type?: string;
  inputType?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  placeholder?: string;
}) {
  const {
    label,
    value,
    resourceType,
    size = "1em",
    weight = "regular",
    type = "text",
    resourceId,
    inputType,
    placeholder,
  } = props;

  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [initialValue, setInitialtValue] = React.useState(value);

  useEffect(() => {
    setInitialtValue((prev) => (value !== prev ? value : prev));
  }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateField = async (
    id: string,
    key: string,
    val: string | number
  ) => {
    const updatedResource = await prisma.template.update({
      where: {
        id: id,
      },
      data: {
        [key]: val,
      },
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing && inputValue !== value) {
      // Call update fn or not by comparing existing value to new input
    }
  }, [isEditing, inputValue]);

  const renderInput = () => {
    if (isEditing && label === "phase_name") {
      return (
        <input
          className={`input ${size} ${weight}`}
          type={inputType}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
          autoFocus
        />
      );
    }
    if (isEditing && label === "phase_number") {
      return (
        <input
          className={`input ${size} ${weight}`}
          type={type}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
          placeholder={value?.toString()}
          size={value?.toString().length}
          autoFocus
        />
      );
    }
    if (isEditing && !label.includes("phase")) {
      return (
        <input
          className={`input ${size} ${weight}`}
          type={type}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          ref={inputRef}
          placeholder={value?.toString()}
          size={value?.toString().length}
          autoFocus
        />
      );
    }
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`input-value ${size} ${weight} ${label}`}
      >
        {label === "phase_number" && `Phase `}
        {value}
        {!value && placeholder && (
          <span className="placeholder italic">{placeholder}</span>
        )}
      </div>
    );
  };
  return <div>{renderInput()}</div>;
}

export default Field;
