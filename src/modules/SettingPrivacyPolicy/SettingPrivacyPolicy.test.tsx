import MockAdapter from "axios-mock-adapter";

import { mockPrivacyPolicyDataLatest } from "@/__mocks__/data";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import axiosInstance from "@/utils/axios";
import SettingPrivacyPolicy from ".";

describe("SettingPrivacyPolicy", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.PRIVACY_POLICY_LATEST).reply(200, mockPrivacyPolicyDataLatest);
  });

  const renderPrivacyPolicy = async () => {
    const view = render(<SettingPrivacyPolicy />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPrivacyPolicy();
    expect(asFragment()).toMatchSnapshot();
  });
});
