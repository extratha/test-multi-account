import { screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { mockPublicPrivacyPolicy, mockPublicTermsAndCons } from "@/__mocks__/data";
import { apiUnauthorizedAxios } from "@/api/apiUnauthorize";
import * as UsePageLoadingStore from "@/store/usePageLoadingStore";
import { PageLoadingStore } from "@/store/usePageLoadingStore";
import { spyUseParams, spyUseRouter, SpyUseRouter } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import PublicConsentType, { PublicConsentTypeParams } from ".";

jest.mock("@/store/usePageLoadingStore", () => {
  return { ...jest.requireActual("@/store/usePageLoadingStore"), __esModule: true };
});

describe("PublicConsentType", () => {
  let params: PublicConsentTypeParams;
  let spyRouter: SpyUseRouter;
  let mockPageLoadingStore: PageLoadingStore;
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    params = { consentType: "terms-conditions" };
    spyRouter = spyUseRouter();
    spyUseParams(params);

    mockPageLoadingStore = {
      isPageLoading: false,
      setPageLoading: jest.fn(),
    };

    jest.spyOn(UsePageLoadingStore, "default").mockImplementation(() => mockPageLoadingStore);

    mockApiAdapter = new MockAdapter(apiUnauthorizedAxios);
    mockApiAdapter.onGet(API.PUBLIC_TERMS_CONDITIONS).reply(200, mockPublicTermsAndCons);
    mockApiAdapter.onGet(API.PUBLIC_PRIVACY_POLICIES).reply(200, mockPublicPrivacyPolicy);
  });

  const renderPublicTermsAndPrivacy = async () => {
    const view = render(<PublicConsentType />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPublicTermsAndPrivacy();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render terms and condition", async () => {
    params.consentType = "terms-conditions";

    await renderPublicTermsAndPrivacy();

    expect(screen.getByTestId("public-consent-type-title")).toHaveTextContent("ข้อกำหนดและเงื่อนไข");
  });

  it("should render privacy policy", async () => {
    params.consentType = "privacy-policies";

    await renderPublicTermsAndPrivacy();

    expect(screen.getByTestId("public-consent-type-title")).toHaveTextContent("นโยบายความเป็นส่วนตัว");
  });

  it("should redirect to not-found page when api consents error", async () => {
    mockApiAdapter.onGet(API.PUBLIC_TERMS_CONDITIONS).reply(404);

    await renderPublicTermsAndPrivacy();

    expect(spyRouter.replace).toHaveBeenCalled();
  });
});
