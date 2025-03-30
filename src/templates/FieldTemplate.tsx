import React from "react";
import { FieldTemplateProps, getTemplate, getUiOptions } from "@rjsf/utils";

/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
export const FieldTemplate = (props: FieldTemplateProps) => {
  const { children, errors, help, registry, uiSchema } = props;
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions,
  );

  return (
    <WrapIfAdditionalTemplate {...props}>
      {children}
      {errors}
      {help}
    </WrapIfAdditionalTemplate>
  );
};
