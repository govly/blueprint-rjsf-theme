import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
  TextArea,
} from "@blueprintjs/core";
import React, {
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
  useState,
} from "react";
import type { WidgetProps } from "@rjsf/utils";
import { getUiOptions } from "@rjsf/utils";

export const TextWidget = (props: WidgetProps) => {
  const {
    id,
    placeholder,
    required,
    readonly,
    disabled,
    label,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
  } = props;

  const inputTypes = [
    { value: "text", label: "Text" },
    { value: "random", label: "Random" },
    { value: "textarea", label: "Textarea" },
    { value: "other", label: "Other" },
  ];

  const rawType = schema.type;
  const setType = rawType === "string" ? "text" : `${rawType}`;
  const inferredType = inputTypes.some((i) => i.value === setType)
    ? setType
    : "other";

  const [localValue, setLocalValue] = useState(value || "");
  const [textType, setTextType] = useState(inferredType);

  const handleTextTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setTextType(newType);

    if (newType === "random") {
      onChange(Math.random().toString(36).substring(2, 15));
    }
  };

  const _onChange = ({ target: { value } }: { target: { value: string } }) =>
    setLocalValue(value === "" ? options.emptyValue : value);
  const _onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val === "" ? options.emptyValue : val);
    onBlur(id, val);
  };
  const _onFocus = ({ target: { value } }: { target: { value: string } }) =>
    onFocus(id, value);

  const uiProps = getUiOptions(uiSchema);
  const uiDescription = uiProps["ui:description"] || schema.description;
  const uiLabel = uiProps["ui:title"] || schema.title || label;
  return (
    <FormGroup
      disabled={disabled}
      helperText={uiDescription as string}
      label={uiLabel as string}
      labelFor={id}
      labelInfo={
        (label || uiProps["ui:title"] || schema.title) && required
          ? "(required)"
          : null
      }
    >
      <ControlGroup
        fill={true}
        vertical={false}
        style={{ alignItems: "stretch" }}
      >
        <HTMLSelect options={inputTypes} onChange={handleTextTypeChange} />
        {textType === "textarea" && (
          <TextArea
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            autoFocus={autofocus}
            onChange={_onChange}
            onBlur={
              _onBlur as unknown as FocusEventHandler<HTMLTextAreaElement>
            }
            onFocus={_onFocus}
            value={localValue}
            style={{ resize: "vertical" }}
          />
        )}
        {!["textarea"].includes(textType) && (
          <>
            <InputGroup
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readonly}
              autoFocus={autofocus}
              onChange={_onChange}
              onBlur={_onBlur}
              onFocus={_onFocus}
              value={localValue}
              type={textType}
            />
            {textType === "random" && (
              <Button
                variant={"minimal"}
                icon={"refresh"}
                size={"small"}
                onClick={() =>
                  onChange(Math.random().toString(36).substring(2, 15))
                }
              />
            )}
          </>
        )}
      </ControlGroup>
    </FormGroup>
  );
};
