import MockAdapter from "axios-mock-adapter";
import "firebase/remote-config";

import { mockAiInterpretResult } from "@/__tests__/__mocks__/data";
import {
  API,
  flushPromise,
  render,
  screen,
  spyUseRouter,
  SpyUseRouter,
  spyUseSearchParams,
  SpyUseSearchParams,
  userEvent,
  waitFor,
} from "@/__tests__/testUtils";
import * as Api from "@/api/api";
import axiosInstance from "@/utils/axios";
import InputDataModule from ".";

describe("InputDataModule", () => {
  let spySearchParams: SpyUseSearchParams;
  let spyRouter: SpyUseRouter;
  let mockApiAdapter: MockAdapter;

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "id") return "interpretId";
    });

    jest.spyOn(Api, "submitLabInterprets");
    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.AI_INTERPRET_URL).reply(200, mockAiInterpretResult);
    mockApiAdapter.onPost(API.SUBMIT_HEALTH_DATA_URI).reply(200, mockAiInterpretResult);
  });

  const renderInputDataModule = async () => {
    const view = render(<InputDataModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderInputDataModule();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display page title", async () => {
    await renderInputDataModule();
    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toBeInTheDocument();
  });

  it("should call router back when click back button", async () => {
    await renderInputDataModule();

    const backButton = screen.getByTestId("back-button");
    await userEvent.click(backButton);

    await waitFor(() => expect(spyRouter.push).toHaveBeenCalledTimes(1));
  });

  it("should render and handle click on use example data button", async () => {
    await renderInputDataModule();

    const exampleDataButton = screen.getByTestId("use-example-data-button");
    expect(exampleDataButton).toBeInTheDocument();
  });

  it("should disabled submit interpret button when form values is invalid", async () => {
    await renderInputDataModule();
    await userEvent.clear(screen.getByTestId("input-number-age"));
    expect(screen.getByTestId("submit-interpret-button")).toBeDisabled();
  });

  it("should call submitLabInterprets when click submit lab interprets button", async () => {
    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await flushPromise();

    // TODO: expected called with data
    expect(Api.submitLabInterprets).toHaveBeenCalled();
  });
});
