"use client";

import { AxiosError } from "axios";
import { ReactNode, useEffect, useState } from "react";

import { ejectOnApiAxiosError, getConsent, setupOnApiAxiosError } from "@/api/api";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { CONSENT_TYPE, ERROR_CODE, NAVIGATION, SEARCH_PARAMS } from "@/constant";
import { RequiredConsentData } from "@/types/model.ui";

interface RequiredConsentProps {
  children: ReactNode;
}

const getSearchParams = () => {
  const pathname = location.pathname;

  const redirectParams = new URLSearchParams({
    [SEARCH_PARAMS.REDIRECT]: pathname.startsWith(NAVIGATION.CONSENTS) ? NAVIGATION.HOME : pathname,
  });

  return redirectParams.toString();
};

const validateError = async (error?: any) => {
  return new Promise((resolve, reject) => {
    const errorCode = error?.response?.data?.code || "";

    if (errorCode === ERROR_CODE.CONSENT_REQUIRED) {
      location.assign(`${NAVIGATION.CONSENT_TERMS_CONDITIONS}?${getSearchParams()}`);
    } else {
      reject(error as AxiosError);
    }
  });
};

// TODO: unit test
const RequiredConsent = ({ children }: RequiredConsentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const validateConsents = async () => {
    const responseTermsCondition = await getConsent(CONSENT_TYPE.TERMS_CONDITIONS);
    const responsePrivacyPolicy = await getConsent(CONSENT_TYPE.PRIVACY_POLICIES);

    const consents: RequiredConsentData[] = [
      { type: CONSENT_TYPE.TERMS_CONDITIONS, data: responseTermsCondition.data },
      { type: CONSENT_TYPE.PRIVACY_POLICIES, data: responsePrivacyPolicy.data },
    ];

    return consents.filter((item) => !item.data.isConsent);
  };

  const handleValidateConsent = async () => {
    try {
      if (location.pathname.startsWith(NAVIGATION.CONSENTS)) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const consents = await validateConsents();

        if (consents.length > 0) {
          location.assign(`${NAVIGATION.CONSENT_TERMS_CONDITIONS}?${getSearchParams()}`);
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      // TODO: error
    }
  };

  useEffect(() => {
    const id = setupOnApiAxiosError(validateError);
    handleValidateConsent();

    return () => {
      ejectOnApiAxiosError(id);
    };
  }, []);

  return isLoading ? <FullScreenLoading /> : children;
};

export default RequiredConsent;
