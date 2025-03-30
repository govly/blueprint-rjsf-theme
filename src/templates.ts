import { ObjectFieldTemplate } from "./templates/ObjectFieldTemplate";
import { FieldTemplate } from "./templates/FieldTemplate";
import { ErrorListTemplate } from "./templates/ErrorListTemplate";
import { ArrayFieldTemplate } from "./templates/ArrayFieldTemplate";
import { SubmitButton } from "./templates/SubmitButton";
import { TitleFieldTemplate } from "./templates/TitleFieldTemplate";
import { DescriptionFieldTemplate } from "./templates/DescriptionFieldTemplate";
import { WrapIfAdditionalTemplate } from "./templates/WrapIfAdditionalTemplate";

export const templates = {
  ObjectFieldTemplate,
  FieldTemplate,
  ErrorListTemplate,
  ArrayFieldTemplate,
  TitleFieldTemplate,
  DescriptionFieldTemplate,
  WrapIfAdditionalTemplate,
  ButtonTemplates: { SubmitButton },
};

export default templates;
