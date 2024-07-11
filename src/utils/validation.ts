export const validateEmail = (value: string) => {
  if (!value) return "Common.validation.require";
  if (!/^\S+@\S+\.\S+$/.test(value.trim())) return "Common.validation.invalidEmail";
  return null;
};

export const validatePassword = (value: string) => {
  if (!value) return "Common.validation.require";
  if (value.length < 8) return "Common.validation.invalidPassword";
  return null;
};
