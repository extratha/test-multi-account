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

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.AI_INTERPRET_URL).reply(200, mockAiInterpretResult);
    mockApiAdapter.onPost(API.SUBMIT_HEALTH_DATA_URI).reply(200, mockAiInterpretResult);
    // jest.spyOn(Api, "postSubmitHealthData");
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

  it("should render interpret data button and be disabled", async () => {
    await renderInputDataModule();
    const ageField = screen.getByTestId("input-number-age");
    await userEvent.clear(ageField);

    const interpretDataButton = screen.getByTestId("interpret-data-button");
    expect(interpretDataButton).toBeInTheDocument();
    expect(interpretDataButton).toBeDisabled();
  });

  it("should render interpret data button and enable after form data is valid", async () => {
    await renderInputDataModule();

    const ageField = screen.getByTestId("input-number-age");

    await userEvent.clear(ageField);
    await userEvent.type(ageField, "20");

    await flushPromise();

    const interpretDataButton = await screen.findByTestId("interpret-data-button");

    expect(interpretDataButton).toBeInTheDocument();
    expect(interpretDataButton).not.toBeDisabled();

    await userEvent.click(interpretDataButton);
  });
});
