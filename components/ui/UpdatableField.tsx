"use client";

import React, { startTransition, useEffect, useRef } from "react";
import "./UpdatableField.scss";
import { updateField } from "@app/actions/actions";
import Form from "./Form";
import { useOptimistic } from "react";
import Select from "./Select";
import { entityOptions, unitOptions } from "@lib/SelectOptions";
import { capitalize } from "@utils/helpers";

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

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleOptimisticUpdate();
      setIsEditing(false);
      setInputValue(initialValue);
    }
  };
  const handleCellClick = () => {
    if (!isHeader) {
      setIsEditing(true);
    }
  };

  const handleOptimisticUpdate = async () => {
    if (inputValue !== value) {
      startTransition(() => {
        setOptimisticValue(inputValue);
      });

      await updateField(resourceType, resourceId, label, inputValue);
    }
    setIsEditing(false);
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

  // useEffect(() => {
  //   if (inputValue !== value) {
  //     handleOptimisticUpdate();
  //   }
  // }, [inputValue]);

  const renderInput = () => {
    if (isEditing) {
      return (
        <Form
          action={() => {
            handleOptimisticUpdate();
          }}
          className={conditionalClassnames?.join(" ")}
        >
          {type === "select" && (
            <Select
              label={label}
              isOpen={isEditing}
              options={label === "entity" ? entityOptions : unitOptions}
              value={optimisticValue || value}
              onOptionClick={(e: any) => {
                setInputValue(e);
                handleOptimisticUpdate();
              }}
              setIsEditing={setIsEditing}
              handleCellClick={() => {
                setIsEditing(true);
              }}
            />
          )}
          {type !== "select" && (
            <input
              type={type}
              onChange={(e) =>
                setInputValue(
                  type === "number"
                    ? parseFloat(e.target.value)
                    : e.target.value
                )
              }
              value={inputValue}
              ref={inputRef}
              placeholder={value}
              autoFocus
            />
          )}
        </Form>
      );
    }
    return (
      <div
        onClick={handleCellClick}
        className={conditionalClassnames?.join(" ")}
      >
        {label === "phase_number" && `Phase `}
        {capitalize(optimisticValue)}
        {!optimisticValue && !value && placeholder && type !== "number" && (
          <span className="placeholder italic">{placeholder}...</span>
        )}
      </div>
    );
  };
  return <>{renderInput()}</>;
}

export default Field;
