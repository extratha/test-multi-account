import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsDataLatest } from "@/__mocks__/data";
import { apiAxios } from "@/api/api";
import { CONSENT_TYPE } from "@/constant";
import { spyUseParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import SettingConsentTypePage from "./page";

describe("SettingConsentTypePage", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    spyUseParams({ consentType: CONSENT_TYPE.TERMS_CONDITIONS });

    mockApiAdapter = new MockAdapter(apiAxios);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS_LATEST).reply(200, mockTermsAndConsDataLatest);
  });

  const renderSettingConsentTypePage = async () => {
    const view = render(<SettingConsentTypePage />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderSettingConsentTypePage();
    expect(asFragment()).toMatchSnapshot();
  });
});
