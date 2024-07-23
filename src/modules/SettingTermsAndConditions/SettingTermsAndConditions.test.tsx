import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsDataLatest } from "@/__mocks__/data";
import { apiAxios } from "@/api/api";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import SettingTermsAndConditions from ".";

describe("SettingTermsAndConditions", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    mockApiAdapter = new MockAdapter(apiAxios);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS_LATEST).reply(200, mockTermsAndConsDataLatest);
  });

  const renderTermsAndCons = async () => {
    const view = render(<SettingTermsAndConditions />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderTermsAndCons();
    expect(asFragment()).toMatchSnapshot();
  });
});
