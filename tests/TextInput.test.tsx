import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp5Theme } from "../src";

const Form = withTheme(Bp5Theme);

describe("Text input rendering", () => {
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
});
