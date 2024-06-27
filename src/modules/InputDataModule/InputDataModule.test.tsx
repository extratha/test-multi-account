import MockAdapter from "axios-mock-adapter";
import "firebase/remote-config";

import { mockAiInterpretResult } from "@/__tests__/__mocks__/data";
import {
  advanceTimersByTime,
  API,
  flushPromise,
  render,
  screen,
  setMockDate,
  spyUseRouter,
  SpyUseRouter,
  spyUseSearchParams,
  SpyUseSearchParams,
  userEvent as UserEvent,
} from "@/__tests__/testUtils";
import * as Api from "@/api/api";
import { INTERPRET_STATUS } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { InterpretResult } from "@/types/aiInterpret";
import axiosInstance from "@/utils/axios";
import clone from "clone";
import InputDataModule from ".";

describe("InputDataModule", () => {
  let spySearchParams: SpyUseSearchParams;
  let spyRouter: SpyUseRouter;
  let mockApiAdapter: MockAdapter;
  let interpretResult: InterpretResult;

  const mockTransactionID = "transactionID";
  const userEvent = UserEvent.setup({ delay: null, advanceTimers: advanceTimersByTime });

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "id") return "interpretId";
    });

    jest.useFakeTimers();
    setMockDate("2000-10-01");

    jest.spyOn(Api, "submitLabInterprets");
    jest.spyOn(Api, "getLabInterpretsByTransactionId");

    interpretResult = clone(mockAiInterpretResult);
    interpretResult.status = INTERPRET_STATUS.SUCCESS;

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.AI_INTERPRET_URL).reply(200, mockAiInterpretResult);
    mockApiAdapter.onPost(API.SUBMIT_HEALTH_DATA_URI).reply(200, { transactionID: mockTransactionID });
    mockApiAdapter.onGet(`${API.SUBMIT_HEALTH_DATA_URI}/${mockTransactionID}`).reply(200, interpretResult);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
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

  it("should call router back when click back button", async () => {
    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("back-button"));
    await advanceTimersByTime(1000);

    expect(spyRouter.push).toHaveBeenCalledWith(webPaths.aiInterpret.tryExampleData);
  });

  it("should call router push when click on use example data button", async () => {
    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("use-example-data-button"));
    await advanceTimersByTime(1000);

    expect(spyRouter.push).toHaveBeenCalledWith(webPaths.aiInterpret.tryExampleData);
  });

  it("should disabled submit interpret button when form values is invalid", async () => {
    await renderInputDataModule();

    await userEvent.clear(screen.getByTestId("input-number-age"));
    await flushPromise();

    expect(screen.getByTestId("submit-interpret-button")).toBeDisabled();
  });

  it("should call submitLabInterprets when click submit lab interprets button", async () => {
    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await advanceTimersByTime(1000);
    await advanceTimersByTime(1000);
    await flushPromise();

    // TODO: expected called with data
    expect(Api.submitLabInterprets).toHaveBeenCalled();
    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockTransactionID);
  });

  it("should should display fetch interpret pending/failed modal when submit health data time pending and timeout", async () => {
    interpretResult.status = INTERPRET_STATUS.PENDING;

    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await advanceTimersByTime(1000);
    await flushPromise();

    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockTransactionID);

    await advanceTimersByTime(1000);
    expect(screen.getByTestId("interpret-image-pending")).toBeInTheDocument();

    await advanceTimersByTime(30000);
    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledTimes(2);

    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });

  it("should display fetch interpret failed modal when submit health data network error", async () => {
    mockApiAdapter.onGet(`${API.SUBMIT_HEALTH_DATA_URI}/${mockTransactionID}`).networkError();

    await renderInputDataModule();
    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await advanceTimersByTime(1000);
    await flushPromise();

    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockTransactionID);

    await advanceTimersByTime(1000);
    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });
});
