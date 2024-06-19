import { remoteConfigKey } from "@/constant/firebase";
import { InputGroupConfig } from "@/types/interpretInputDataConfig";
import { remoteConfig } from "@/utils/firebase";
import { useEffect, useState } from "react";

const useInterpretInputDataConfig = () => {
  const [configData, setConfigData] = useState<InputGroupConfig[]>([]);

  useEffect(() => {
    const fetchConfigData = async () => {
      const remoteConfigData = await remoteConfig.getString(remoteConfigKey.LAB_INTERPRET_REQUIRE_FIELDS);
      setConfigData(JSON.parse(remoteConfigData));
    };
    fetchConfigData();
  }, []);

  return configData;
};

export default useInterpretInputDataConfig;
