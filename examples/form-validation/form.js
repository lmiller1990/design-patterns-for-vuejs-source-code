/**
 * name
 * weight (imp|metric)
 */

export function required(value) {
  if (!value) {
    return {
      valid: false,
      message: 'Required'
    }
  }

  return { valid: true }
}

export function isBetween(value, { min, max }) {
  if (value < min || value > max) {
    return {
      valid: false,
      message: `Must be between ${min} and ${max}`
    }
  }

  return { valid: true }
}

const limits = {
  kg: { min: 30, max: 200 },
  lb: { min: 66, max: 440 },
}

export function validateMeasurement(value, { constraints }) {
  const result = required(value)
  if (!result.valid) {
    return result
  }

  return isBetween(value, constraints)
}

export function isFormValid(form) {
  return form.name.valid && form.weight.valid
}

export function patientForm(patient) {
  const name = required(patient.name)

  const weight = validateMeasurement(patient.weight.value, {
    nullable: false,
    constraints: limits[patient.weight.units]
  })

  return {
    name,
    weight,
  }
}

