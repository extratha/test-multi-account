import MockAdapter from "axios-mock-adapter";

import { mockPublicPrivacyPolicy, mockPublicTermsAndCons } from "@/__mocks__/data";
import { apiUnauthorizedAxios } from "@/api/apiUnauthorize";
import { PublicConsentTypeParams } from "@/modules/PublicConsentType";
import * as UsePageLoadingStore from "@/store/usePageLoadingStore";
import { PageLoadingStore } from "@/store/usePageLoadingStore";
import { spyUseParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import Consents from "./page";

jest.mock("@/store/usePageLoadingStore", () => {
  return { ...jest.requireActual("@/store/usePageLoadingStore"), __esModule: true };
});

describe("Consents", () => {
  let mockApiAdapter: MockAdapter;
  let mockPageLoadingStore: PageLoadingStore;
  let params: PublicConsentTypeParams;

  beforeEach(() => {
    params = { consentType: "terms-conditions" };
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

  const renderConsents = async () => {
    const view = render(<Consents />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderConsents();
    expect(asFragment()).toMatchSnapshot();
  });
});
