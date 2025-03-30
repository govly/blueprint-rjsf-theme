import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp5Theme } from "../src";
import { expect } from "vitest";

const Form = withTheme(Bp5Theme);

describe("Select box rendering", () => {
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

    expect(screen.getByText("Select option")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
    expect(screen.getByText("Open dropdown")).toBeInTheDocument();
  });

  it("renders a select widget with anyOf", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            features: {
              anyOf: [
                {
                  type: "array",
                  items: {
                    anyOf: [{ type: "string" }],
                  },
                },
                {
                  type: "string",
                },
              ],
            },
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Select option")).toBeInTheDocument();
    expect(screen.getByText("Option 0")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders a select widget with oneOf", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            features: {
              oneOf: [
                {
                  type: "array",
                  items: {
                    oneOf: [{ type: "string" }],
                  },
                },
                {
                  type: "string",
                },
              ],
            },
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Select option")).toBeInTheDocument();
    expect(screen.getByText("Option 0")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders a select widget with oneOf and title", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            features: {
              oneOf: [
                {
                  type: "array",
                  items: {
                    oneOf: [{ type: "string" }],
                  },
                },
                {
                  type: "string",
                },
              ],
              title: "Features title",
            },
          },
        }}
        validator={validator}
      />,
    );

    expect(screen.getByText("Features title")).toBeInTheDocument();
    expect(screen.getByText("Option 0")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
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
