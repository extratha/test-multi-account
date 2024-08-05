import { screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { mockPublicPrivacyPolicy, mockPublicTermsAndCons } from "@/__mocks__/data";
import * as ApiUnauthorizedAxios from "@/api/apiUnauthorize";
import { apiUnauthorizedAxios } from "@/api/apiUnauthorize";
import { CONSENT_TYPE } from "@/constant";
import { spyUseParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import PublicConsentType, { PublicConsentTypeParams } from ".";

describe("PublicConsentType", () => {
  let params: PublicConsentTypeParams;
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    params = { consentType: "terms-conditions" };
    spyUseParams(params);

    jest.spyOn(ApiUnauthorizedAxios, "getPublicConsent");

    mockApiAdapter = new MockAdapter(apiUnauthorizedAxios);
    mockApiAdapter.onGet(API.PUBLIC_TERMS_CONDITIONS).reply(200, mockPublicTermsAndCons);
    mockApiAdapter.onGet(API.PUBLIC_PRIVACY_POLICIES).reply(200, mockPublicPrivacyPolicy);
  });

  const renderPublicConsentType = async () => {
    const view = render(<PublicConsentType />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPublicConsentType();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render terms and condition", async () => {
    params.consentType = "terms-conditions";

    await renderPublicConsentType();

    expect(ApiUnauthorizedAxios.getPublicConsent).toHaveBeenCalledWith(CONSENT_TYPE.TERMS_CONDITIONS);
    expect(screen.getByTestId("public-consent-type-title")).toHaveTextContent("ข้อกำหนดและเงื่อนไข");
  });

  it("should render privacy policy", async () => {
    params.consentType = "privacy-policies";

    await renderPublicConsentType();

    expect(ApiUnauthorizedAxios.getPublicConsent).toHaveBeenCalledWith(CONSENT_TYPE.PRIVACY_POLICIES);
    expect(screen.getByTestId("public-consent-type-title")).toHaveTextContent("นโยบายความเป็นส่วนตัว");
  });

  it("should redirect to not-found page when api consents error", async () => {
    mockApiAdapter.onGet(API.PUBLIC_TERMS_CONDITIONS).reply(404);
    await renderPublicConsentType();

    expect(screen.getByTestId("page-not-found")).toBeInTheDocument();
  });
});
