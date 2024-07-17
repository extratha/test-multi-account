import { fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";

import firebaseApp from "@/config/firebase";
import { DashboardMenuConfigResult, InputGroupConfigResult, SymptomCheckerConfigResult } from "@/types/model.ui";
import { REMOTE_CONFIG_INTERVAL } from "../config";

const getConfig = async (key: string) => {
  const remoteConfig = getRemoteConfig(firebaseApp);
  remoteConfig.settings.minimumFetchIntervalMillis = REMOTE_CONFIG_INTERVAL;
  await fetchAndActivate(remoteConfig);
  return getValue(remoteConfig, key);
};

export const getDashboardMenuConfig = async () => {
  const config = await getConfig("DashboardMenu");
  return JSON.parse(config.asString()) as DashboardMenuConfigResult;
};

export const getLabInterpretFieldsConfig = async () => {
  const config = await getConfig("LabInterpretRequireFields");
  return JSON.parse(config.asString()) as InputGroupConfigResult[];
};

export const getSymptomCheckerConfig = async () => {
  const config = await getConfig("SymptomChecker");
  return JSON.parse(config.asString()) as SymptomCheckerConfigResult;
};
