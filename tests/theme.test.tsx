import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp5Theme } from "../src";

const Form = withTheme(Bp5Theme);

describe("RJSF Blueprint5 Theme", () => {
  it("renders a simple text input", () => {
    render(
      <Form
        schema={{
          title: "Example",
          type: "object",
          properties: {
            name: { type: "string", title: "Name" },
          },
        }}
        validator={validator}
      />,
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

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
