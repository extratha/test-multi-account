import packageInfo from "../../package.json";

export const storage = (key: string) => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(key) || localStorage.getItem(key) || "";
};

export const removeStorage = (key: string) => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};

export const getVersion = () => {
  return packageInfo.version;
};
