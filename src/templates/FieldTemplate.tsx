import React, { FocusEvent } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import type { FieldTemplateProps } from "@rjsf/utils";
import { ADDITIONAL_PROPERTY_FLAG } from "@rjsf/utils";

export const FieldTemplate = (props: FieldTemplateProps) => {
  const { children, errors, help, schema } = props;
  const additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

  return (
    <WrapIfAdditional props={props} additional={additional}>
      {children}
      {errors}
      {help}
    </WrapIfAdditional>
  );
};

const WrapIfAdditional = ({
  props,
  additional,
  children,
}: {
  props: FieldTemplateProps;
  additional: boolean;
  children: React.ReactNode;
}) => {
  const {
    id,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
  } = props;
  if (!additional) {
    return children;
  }

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) =>
    onKeyChange(target.value);

  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginBottom: "5px",
      }}
    >
      <div style={{ flex: 1 }} key={`${id}-key`}>
        <FormGroup>
          <InputGroup
            required={required}
            disabled={disabled || readonly}
            id={`${id}-key`}
            onBlur={!readonly ? handleBlur : undefined}
            defaultValue={label}
            size={"small"}
          />
        </FormGroup>
        {children}
      </div>
      <div style={{ alignSelf: "center" }}>
        <Button
          intent="danger"
          variant={"minimal"}
          icon="remove"
          tabIndex={-1}
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
        />
      </div>
    </Card>
  );
};
