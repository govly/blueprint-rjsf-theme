import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp6Theme } from "../src";

const Form = withTheme(Bp6Theme);

describe("Checkbox rendering", () => {
  it("renders a checkbox group", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            features: {
              type: "array",
              title: "Features",
              items: {
                type: "string",
                enum: ["A", "B", "C"],
              },
              uniqueItems: true,
            },
          },
        }}
        uiSchema={{
          features: {
            "ui:widget": "checkboxes",
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByLabelText("A")).toBeInTheDocument();
    expect(screen.getByLabelText("B")).toBeInTheDocument();
    expect(screen.getByLabelText("C")).toBeInTheDocument();
  });
});
