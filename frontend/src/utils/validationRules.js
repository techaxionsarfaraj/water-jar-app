// src/utils/validationRules.js
export const rules = {
  required: (v) => !!v || 'This field is required',

  phone: (v) => /^(\+?\d{1,4}[-.\s]?)?(\d{10})$/.test(v) || 'Enter a valid 10-digit phone',
  digitsOnly: (v) => !v || /^\d+$/.test(v) || 'Only digits are allowed',

  // ✅ Required + valid email
  email: (v) => (!!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || 'Enter a valid email',

  minLength: (min) => (v) => (v && v.length >= min) || `Minimum ${min} characters required`,

  maxLength: (max) => (v) => (v && v.length <= max) || `Maximum ${max} characters allowed`,
}
