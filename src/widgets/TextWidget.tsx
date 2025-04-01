import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { FocusEvent, useState } from "react";
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

  const [localValue, setLocalValue] = useState(value || "");

  const _onChange = ({ target: { value } }: { target: { value: string } }) => {
    const empty = options.emptyValue || " ";
    setLocalValue(value === "" ? empty : value);
  };
  const _onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const empty = options.emptyValue || " ";
    onChange(val === "" ? empty : val);
    onBlur(id, val === "" ? empty : val);
  };
  const _onFocus = ({ target: { value } }: { target: { value: string } }) => {
    const empty = options.emptyValue || " ";
    onFocus(id, value === "" ? empty : value);
  };

  const uiProps = getUiOptions(uiSchema);
  const uiDescription = uiProps["ui:description"] || schema.description;
  const uiLabel = uiProps["ui:title"] || schema.title || label;
  return (
    <FormGroup
      disabled={disabled}
      helperText={uiDescription as string}
      fill={true}
      label={uiLabel as string}
      labelFor={id}
      labelInfo={
        (label || uiProps["ui:title"] || schema.title) && required
          ? "(required)"
          : null
      }
    >
      <InputGroup
        id={id}
        fill={true}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        autoFocus={autofocus}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        value={localValue}
      />
    </FormGroup>
  );
};
