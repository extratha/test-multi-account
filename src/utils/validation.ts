export const validateEmail = (value: string) => {
  if (!value) return "validation.require";
  if (!/^\S+@\S+\.\S+$/.test(value.trim())) return "validation.invalidEmail";
  return null;
};

export const validatePassword = (value: string) => {
  if (!value) return "validation.require";
  if (value.length < 8) return "validation.invalidPassword";
  return null;
};
