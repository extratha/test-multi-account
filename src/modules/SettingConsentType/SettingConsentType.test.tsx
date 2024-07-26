import MockAdapter from "axios-mock-adapter";

import { mockPrivacyPolicyDataLatest, mockTermsAndConsDataLatest } from "@/__mocks__/data";
import { apiAxios } from "@/api/api";
import { CONSENT_TYPE } from "@/constant";
import { spyUseParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import SettingConsentType, { SettingConsentTypeParams } from ".";

describe("SettingConsentType", () => {
  let mockApiAdapter: MockAdapter;
  let params: SettingConsentTypeParams;

  beforeEach(() => {
    params = { consentType: CONSENT_TYPE.TERMS_CONDITIONS };
    spyUseParams(params);

    mockApiAdapter = new MockAdapter(apiAxios);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS_LATEST).reply(200, mockTermsAndConsDataLatest);
    mockApiAdapter.onGet(API.PRIVACY_POLICY_LATEST).reply(200, mockPrivacyPolicyDataLatest);
  });

  const renderSettingConsentType = async () => {
    const view = render(<SettingConsentType />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderSettingConsentType();
    expect(asFragment()).toMatchSnapshot();
  });
});
