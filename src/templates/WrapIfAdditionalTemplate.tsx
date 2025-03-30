import {
  ADDITIONAL_PROPERTY_FLAG,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";
import React, { FocusEvent } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";

export const WrapIfAdditionalTemplate = (
  props: WrapIfAdditionalTemplateProps,
) => {
  const {
    children,
    id,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
    schema,
    classNames,
    style,
  } = props;

  const additional = ADDITIONAL_PROPERTY_FLAG in schema;
  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {React.Children.toArray(children)}
      </div>
    );
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
      <div style={{ flex: 1 }}>
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
        {React.Children.toArray(children)}
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
