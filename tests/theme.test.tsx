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

  it("renders a select widget", () => {
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
            "ui:widget": "select",
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Open dropdown")).toBeInTheDocument();
  });

  it("renders a select widget with a placeholder", () => {
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
            "ui:widget": "select",
            "ui:placeholder": "Select a feature",
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Select a feature")).toBeInTheDocument();
  });
});
