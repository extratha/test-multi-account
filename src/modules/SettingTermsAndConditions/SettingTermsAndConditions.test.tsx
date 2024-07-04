import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsData } from "@/__tests__/__mocks__/data";
import { API, flushPromise, render } from "@/__tests__/testUtils";
import * as Api from "@/api/api";
import axiosInstance from "@/utils/axios";
import SettingTermsAndConditions from "./Index";

jest.mock("react-markdown", () => (props: any) => {
  return <>{props.children}</>;
});

describe("SettingTermsAndConditions", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    jest.spyOn(Api, "getTermsAndConditions");

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).reply(200, mockTermsAndConsData);
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
