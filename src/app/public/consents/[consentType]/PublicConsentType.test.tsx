import MockAdapter from "axios-mock-adapter";

import { mockPublicPrivacyPolicy, mockPublicTermsAndCons } from "@/__mocks__/data";
import { apiUnauthorizedAxios } from "@/api/apiUnauthorize";
import { PublicConsentTypeParams } from "@/modules/PublicConsentType";
import { spyUseParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import Consents from "./page";

describe("PublicConsentType", () => {
  let mockApiAdapter: MockAdapter;
  let params: PublicConsentTypeParams;

  beforeEach(() => {
    params = { consentType: "terms-conditions" };
    spyUseParams(params);

    mockApiAdapter = new MockAdapter(apiUnauthorizedAxios);
    mockApiAdapter.onGet(API.PUBLIC_TERMS_CONDITIONS).reply(200, mockPublicTermsAndCons);
    mockApiAdapter.onGet(API.PUBLIC_PRIVACY_POLICIES).reply(200, mockPublicPrivacyPolicy);
  });

  const renderPublicConsentType = async () => {
    const view = render(<Consents />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPublicConsentType();
    expect(asFragment()).toMatchSnapshot();
  });
});
