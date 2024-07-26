export const ENV = {
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL || "MOCK_NEXT_PUBLIC_BASE_API_URL",
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "MOCK_NEXT_PUBLIC_FIREBASE_API_KEY",
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "MOCK_NEXT_PUBLIC_FIREBASE_APP_ID",
  FIREBASE_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
};

export const SESSION = {
  ACCESS_TOKEN: "access-token",
  REFRESH_TOKEN: "refresh-token",
  RESET_PASSWORD_TOKEN: "reset-password-token",
  X_ROBOT_TOKEN: "x-robot-token",
};

export const MENU_CONDITION = {
  LOGOUT: "logout",
};

export const NAVIGATION = {
  NOT_FOUND: "/not-found",
  LOGIN: "/login",
  HOME: "/home",
  FORGET_PASSWORD: "/forget-password",
  SET_NEW_PASSWORD: "/set-new-password",
  CONSENT_TERMS_CONDITIONS: "/consents/terms-conditions",
  CONSENT_PRIVACY_POLICIES: "/consents/privacy-policies",
  AI_INTERPRET_RESULT: "/ai-interpret/interpret",
  AI_INTERPRET_TRY_EXAMPLE_DATA: "/ai-interpret/try-example-data",
  AI_INTERPRET_TRY_INPUT_DATA: "/ai-interpret/try-input-data",
  SYMPTOM_CHECKER: "/symptom-checker",
  SETTINGS_TERMS_AND_CONDITIONS: "/settings/terms-and-conditions",
  SETTINGS_PRIVACY_POLICY: "/settings/privacy-policy",
  PUBLIC_TERMS_AND_CONDITIONS: "/public/consents/terms-conditions",
  PUBLIC_PRIVACY_POLICY: "/public/consents/privacy-policies",
};

export const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
};

export const CONFIG_FIELD_TYPES = {
  STRING: "String",
  NUMBER: "Number",
  DROPDOWN: "Dropdown",
};

export const GROUP_NAME = {
  GENERAL_CHECK_UP: "generalCheckUp",
  HEMATOLOGY_BG: "hematologyBG",
  HEMATOLOGY_CBC: "hematologyCBC",
  LIPID_PROFILE: "lipidProfile",
  BLOOD_CHEMISTRY: "bloodChemistry",
  RENAL_FUNCTION_TEST: "renalFunctionTest",
  LIVER_FUNCTION_TEST: "liverFunctionTest",
  URINE_ANALYSIS: "urineAnalysis",
  STOOL_EXAMINATION: "stoolExamination",
  PAP_SMEAR: "papSmear",
  TUMOR_MARKER: "tumorMarker",
};

export const GENERAL_CHECK_UP = {
  AGE: "age",
  GENDER: "gender",
  BODY_WEIGHT: "body_weight",
  BODY_HEIGHT: "body_height",
  WAIST_LINE: "waist_line",
  BLOOD_PRESSURE_SYSTOLIC: "blood_pressure_systolic",
  BLOOD_PRESSURE_DIASTOLIC: "blood_pressure_diastolic",
  PULSE: "pulse",
  RESPIRATORY_RATE: "respiratory_rate",
  TEMPERATURE: "temperature",
};

export const HEMATOLOGY_BLOOD = {
  BLOOD_GROUP: "blood_group",
  BLOOD_GROUP_RH: "blood_group_rh",
};

export const HEMATOLOGY_BLOOD_GROUP = {
  HEMATOLOGY_BLOOD: "bloodGroup",
};

export const HEMATOLOGY_CBC = {
  HB: "hb_value",
  HCT: "hct_value",
  RBC_MORPHOLOGY: "rbc_morphology_value",
  MCV: "mcv_value",
  MCH: "mch_value",
  MCHC: "mchc_value",
  RDW: "rdw_value",
  WBC: "wbc_value",
  NEUTROPHIL: "neutrophil_value",
  LYMPHOCYTE: "lymphocyte_value",
  MONOCYTE: "monocyte_value",
  EOSINOPHIL: "eosinophil_value",
  BASOPHIL: "basophil_value",
  PLATELET_COUNT: "platelet_count_value",
};

export const HEMATOLOGY_CBC_GROUP = {
  HEMOGLOBIN: "hemoglobin",
  WHITE_BLOOD: "whiteBlood",
  RED_BLOOD: "redBlood",
};

export const INTERPRET_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

export const ASR_SERVICE = {
  ORDER_ASR: "order-asr",
  SOAP_ASR: "soap-asr",
};

export const ASR_SERVICE_KEY: Record<string, string> = {
  [ASR_SERVICE.ORDER_ASR]: "orderAsr",
  [ASR_SERVICE.SOAP_ASR]: "soapAsr",
};

export const CONSENT_TYPE = {
  TERMS_CONDITIONS: "terms-conditions",
  PRIVACY_POLICIES: "privacy-policies",
};

export const SUBMIT_CONSENT_TYPE = {
  [CONSENT_TYPE.TERMS_CONDITIONS]: "terms",
  [CONSENT_TYPE.PRIVACY_POLICIES]: "privacy_policies",
};
