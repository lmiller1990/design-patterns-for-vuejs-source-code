import { describe, it, expect } from "vitest";
import {
  Validator,
  required,
  validateRange,
  applyRules,
  isFormValid,
  patientForm,
} from "./form.js";

describe("required", () => {
  it("is invalid when undefined", () => {
    expect(required(undefined)).toEqual({
      valid: false,
      message: "Required",
    });
  });
  it("is invalid when empty string", () => {
    expect(required("")).toEqual({
      valid: false,
      message: "Required",
    });
  });
  it("returns true false value is present", () => {
    expect(required("some value")).toEqual({ valid: true });
  });
});

describe("validateRange", () => {
  it("returns true when value is equal to min", () => {
    expect(validateRange(5, { min: 5, max: 10 })).toEqual({
      valid: true,
    });
  });

  it("returns true when value is between min/max", () => {
    expect(validateRange(7, { min: 5, max: 10 })).toEqual({
      valid: true,
    });
  });

  it("returns true when value is equal to max", () => {
    expect(validateRange(10, { min: 5, max: 10 })).toEqual({
      valid: true,
    });
  });

  it("returns false when value is less than min", () => {
    expect(validateRange(4, { min: 5, max: 10 })).toEqual({
      valid: false,
      message: "Must be between 5 and 10",
    });
  });

  it("returns false when value is greater than max", () => {
    expect(validateRange(11, { min: 5, max: 10 })).toEqual({
      valid: false,
      message: "Must be between 5 and 10",
    });
  });
});

describe("applyRules", () => {
  it("returns invalid for missing required input", () => {
    const actual = applyRules(required(""));
    expect(actual).toEqual({ valid: false, message: "Required" });
  });

  it("returns invalid when outside range", () => {
    const constraints = { min: 10, max: 30 };
    const actual = applyRules(validateRange(9, constraints));
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 10 and 30",
    });
  });
  it("returns invalid when at least one validator is invalid", () => {
    const alwaysValid: Validator = () => ({ valid: true });
    const neverValid: Validator = () => ({
      valid: false,
      message: "Invalid!",
    });
    const actual = applyRules(alwaysValid(), neverValid());
    expect(actual).toEqual({ valid: false, message: "Invalid!" });
  });
  it("returns true when all validators return true", () => {
    const alwaysValid: Validator = () => ({ valid: true });
    const actual = applyRules(alwaysValid());
    expect(actual).toEqual({ valid: true });
  });
});

describe("isFormValid", () => {
  it("returns true when all fields are valid", () => {
    const form = {
      name: { valid: true },
      weight: { valid: true },
    };
    expect(isFormValid(form)).toBe(true);
  });
  it("returns false when any field is invalid", () => {
    const form = {
      name: { valid: false },
      weight: { valid: true },
    };
    expect(isFormValid(form)).toBe(false);
  });
});

describe("patientForm", () => {
  const validPatient: Patient = {
    name: "test patient",
    weight: { value: 100, units: "kg" },
  };
  it("is valid when form is filled out correctly", () => {
    const form = patientForm(validPatient);
    expect(form.name).toEqual({ valid: true });
    expect(form.weight).toEqual({ valid: true });
  });
  it("is invalid when name is null", () => {
    const form = patientForm({ ...validPatient, name: "" });
    expect(form.name).toEqual({ valid: false, message: "Required" });
  });
  it("validates weight in imperial", () => {
    const form = patientForm({
      ...validPatient,
      weight: {
        value: 65,
        units: "lb",
      },
    });
    expect(form.weight).toEqual({
      valid: false,
      message: "Must be between 66 and 440",
    });
  });
  it("validates weight in metric", () => {
    const form = patientForm({
      ...validPatient,
      weight: {
        value: 29,
        units: "kg",
      },
    });
    expect(form.weight).toEqual({
      valid: false,
      message: "Must be between 30 and 200",
    });
  });
});
