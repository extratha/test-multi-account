import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsData } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import axiosInstance from "@/utils/axios";
import SettingTermsAndConditionsPage from "./page";

jest.mock("react-markdown", () => (props: any) => {
  return <>{props.children}</>;
});

describe("SettingTermsAndConditionsPage", () => {
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    jest.spyOn(Api, "getTermsAndConditions");

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).reply(200, mockTermsAndConsData);
  });

  const renderTermsAndCons = async () => {
    const view = render(<SettingTermsAndConditionsPage />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderTermsAndCons();
    expect(asFragment()).toMatchSnapshot();
  });
});
