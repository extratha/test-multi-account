import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsData } from "@/__tests__/__mocks__/data";
import * as Api from "@/api/api";
import { webPaths } from "@/constant/webPaths";
import TermsAndConsModules from "@/modules/TermsAndConditions";
import axiosInstance from "@/utils/axios";
import { API, flushPromise, render, screen, spyUseRouter, SpyUseRouter, userEvent } from "../../__tests__/testUtils";

jest.mock("react-markdown", () => (props: any) => {
  return <>{props.children}</>;
});

describe("TermsAndConditions", () => {
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spyRouter = spyUseRouter();

    jest.spyOn(Api, "getTermsAndConditions");
    jest.spyOn(Api, "submitConsent");

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.TERMS_AND_CONS).reply(200, mockTermsAndConsData);
    mockApiAdapter.onPost(API.CONSENT).reply(201);
  });

  const renderTermsAndCons = async () => {
    const view = render(<TermsAndConsModules />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderTermsAndCons();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should submit consent and navigate to Home page when submit terms and cons agreement success", async () => {
    await renderTermsAndCons();

    await userEvent.click(screen.getByTestId("agreement-checkbox"));

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();

    await userEvent.click(screen.getByTestId("submit-button"));

    expect(Api.submitConsent).toHaveBeenCalledTimes(1);
    expect(spyRouter.push).toHaveBeenCalledWith(webPaths.home);
  });

  it("should not display consent when fetch consent error", () => {
    mockApiAdapter.onGet(API.TERMS_AND_CONS).networkError();

    renderTermsAndCons();

    expect(screen.queryByTestId("terms-and-conditions-consent")).not.toBeInTheDocument();
  });
});
