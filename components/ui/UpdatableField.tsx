"use client";

import React, { startTransition, useEffect, useRef } from "react";
import "./UpdatableField.scss";
import { updateField } from "@app/actions/actions";
import Form from "./Form";
import { useOptimistic } from "react";

function Field(props: {
  label: string;
  value: any;
  resourceType: "template" | "campaign" | "event";
  weight?: string;
  resourceId: string;
  type?: string;
  inputType?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  placeholder?: string;
  classnames?: string[];
  isHeader?: boolean;
}) {
  const {
    label,
    value,
    type,
    resourceId,
    inputType,
    placeholder,
    classnames,
    resourceType,
    isHeader,
  } = props;

  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [initialValue, setInitialtValue] = React.useState(value);

  const [optimisticValue, setOptimisticValue] = useOptimistic(
    value,
    (state, newValue) => {
      return [newValue];
    }
  );

  const conditionalClassnames =
    isEditing && classnames
      ? [...classnames, "active"]
      : classnames
      ? [...classnames, "passive"]
      : ["passive"];

  useEffect(() => {
    setInitialtValue((prev: any) => (value !== prev ? value : prev));
  }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCellClick = () => {
    if (!isHeader) {
      setIsEditing(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleOptimisticUpdate();
      setIsEditing(false);
      setInputValue(initialValue);
    }
  };

  const handleOptimisticUpdate = async () => {
    if (inputValue !== value) {
      startTransition(() => {
        setOptimisticValue(inputValue);
      });

      await updateField(resourceType, resourceId, label, inputValue);
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
  }, [isEditing, inputValue]);

  useEffect(() => {
    if (!isEditing) {
      handleOptimisticUpdate();
    }
  }, [isEditing]);

  const renderInput = () => {
    if (isEditing) {
      return (
        <Form
          action={() => {
            setIsEditing(false);
          }}
          className={conditionalClassnames?.join(" ")}
        >
          <input
            type={type}
            onChange={(e) =>
              setInputValue(
                type === "number" ? parseFloat(e.target.value) : e.target.value
              )
            }
            value={inputValue}
            ref={inputRef}
            placeholder={value}
            autoFocus
          />
        </Form>
      );
    }
    return (
      <div
        onClick={handleCellClick}
        className={conditionalClassnames?.join(" ")}
      >
        {label === "phase_number" && `Phase `}
        {optimisticValue}
        {!optimisticValue && !value && placeholder && type !== "number" && (
          <span className="placeholder italic">{placeholder}</span>
        )}
      </div>
    );
  };
  return <>{renderInput()}</>;
}

export default Field;
