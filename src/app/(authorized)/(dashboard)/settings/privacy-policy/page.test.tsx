import MockAdapter from "axios-mock-adapter";

import { mockPrivacyPolicyDataLatest } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { apiAxios } from "@/api/api";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import SettingPrivacyPolicyPage from "./page";

jest.mock("react-markdown", () => (props: any) => {
  return <>{props.children}</>;
});

describe("SettingPrivacyPolicyPage", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    jest.spyOn(Api, "getPrivacyPolicy");

    mockApiAdapter = new MockAdapter(apiAxios);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).reply(200, mockPrivacyPolicyDataLatest);
  });

  const renderPrivacyPolicy = async () => {
    const view = render(<SettingPrivacyPolicyPage />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPrivacyPolicy();
    expect(asFragment()).toMatchSnapshot();
  });
});
