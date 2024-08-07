"use client";

import { ReactNode, useEffect, useState } from "react";

import { ejectOnApiAxiosError, getConsent, setupOnApiAxiosError } from "@/api/api";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { CONSENT_TYPE, ERROR_CODE } from "@/constant";
import { RequiredConsentData } from "@/types/model.ui";
import RequiredConsentDialog from "./RequiredConsentDialog";

interface RequiredConsentsProps {
  children: ReactNode;
}

// TODO: unit test
const RequiredConsent = ({ children }: RequiredConsentsProps) => {
  const [consentList, setConsentList] = useState<RequiredConsentData[]>([]);

  const [consent, setConsent] = useState<RequiredConsentData>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const updateNextConsent = () => {
    let newConsent: RequiredConsentData | undefined = undefined;

    if (consentList.length === 0) return;

    if (activeIndex < consentList.length) {
      newConsent = consentList[activeIndex];
    } else {
      setConsentList([]);
    }

    setConsent(newConsent);
    setActiveIndex(activeIndex + 1);
  };

  const validateConsents = async () => {
    const responseTermsCondition = await getConsent(CONSENT_TYPE.TERMS_CONDITIONS);
    const responsePrivacyPolicy = await getConsent(CONSENT_TYPE.PRIVACY_POLICIES);

    const consents: RequiredConsentData[] = [
      { type: CONSENT_TYPE.TERMS_CONDITIONS, data: responseTermsCondition.data },
      { type: CONSENT_TYPE.PRIVACY_POLICIES, data: responsePrivacyPolicy.data },
    ];

    const required = consents.filter((item) => !item.data.isConsent);
    setConsentList(required);
  };

  const handleValidateConsent = async () => {
    try {
      setIsLoading(true);
      await validateConsents();
      setIsLoading(false);
    } catch (error) {
      // TODO: error
    }
  };

  const validateError = async (error?: any) => {
    const errorCode = error?.response?.data?.code || "";

    if (errorCode === ERROR_CODE.CONSENT_REQUIRED) {
      await validateConsents();
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const id = setupOnApiAxiosError(validateError);
    handleValidateConsent();
    return () => {
      ejectOnApiAxiosError(id);
    };
  }, []);

  useEffect(() => {
    updateNextConsent();
  }, [consentList.length]);

  return (
    <>
      {isLoading ? <FullScreenLoading /> : children}
      {consent && <RequiredConsentDialog consent={consent} onSubmitted={updateNextConsent} />}
    </>
  );
};

export default RequiredConsent;
