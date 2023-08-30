interface ValidationResult {
  valid: boolean;
  message?: string;
}

export type Validator = (...args: any[]) => ValidationResult;

export const required: Validator = (value: any): ValidationResult => {
  if (!value) {
    return {
      valid: false,
      message: `Required`,
    };
  }
  return { valid: true };
};

interface RangeRule {
  min: number;
  max: number;
}

export const validateRange: Validator = (
  value: number,
  { min, max }: RangeRule
): ValidationResult => {
  if (value < min || value > max) {
    return {
      valid: false,
      message: `Must be between ${min} and ${max}`,
    };
  }
  return { valid: true };
};

export function applyRules(
  ...results: ValidationResult[]
): ValidationResult {
  return results.find((result) => !result.valid) ?? { valid: true };
}

// definition
export interface Patient {
  name: string;
  weight: {
    value: number;
    units: "kg" | "lb";
  };
}

interface ValidationResult {
  valid: boolean;
  messsage?: string;
}

interface PatientFormValidity {
  name: ValidationResult;
  weight: ValidationResult;
}

export function isFormValid<
  T extends Record<string, ValidationResult>
>(form: T): boolean {
  const invalidField = Object.values(form).find((res) => !res.valid);
  return invalidField ? false : true;
}

const limits = {
  kg: { min: 30, max: 200 },
  lb: { min: 66, max: 440 },
};

type PatientForm = {
  [k in keyof Patient]: ValidationResult;
};

export function patientForm(patient: Patient): PatientForm {
  return {
    name: required(patient.name),
    weight: applyRules(
      required(patient.weight.value),
      validateRange(
        patient.weight.value,
        limits[patient.weight.units]
      )
    ),
  };
}