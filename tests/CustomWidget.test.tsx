import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp6Theme } from "../src";

const Form = withTheme(Bp6Theme);

describe("Custom widgets rendering", () => {
  it("renders a custom widget", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            features: {
              type: "string",
              title: "Features",
              enum: ["A", "B", "C"],
            },
          },
        }}
        uiSchema={{
          features: {
            "ui:widget": "custom",
          },
        }}
        widgets={{
          custom: () => <div>Custom widget</div>,
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Custom widget")).toBeInTheDocument();
  });
});
