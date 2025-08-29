import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Bp6Theme } from "../src";

const Form = withTheme(Bp6Theme);

describe("FieldTemplate warnings", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    consoleError.mockClear();
  });

  afterEach(() => {
    consoleError.mockReset();
  });

  test("does not log missing React key warning", () => {
    render(
      <Form
        schema={{
          type: "object",
          properties: {
            first: { type: "string" },
            second: { type: "string" },
          },
        }}
        validator={validator}
      />,
    );

    const errorCalls = consoleError.mock.calls;
    errorCalls.forEach(([msg]) => {
      console.warn("React warning:", msg);
    });
    const keyWarnings = errorCalls.filter(([msg]) =>
      msg.includes('Each child in a list should have a unique "key"'),
    );

    expect(keyWarnings.length).toBe(0);
  });
});
