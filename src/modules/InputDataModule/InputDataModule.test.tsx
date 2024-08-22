import { screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import clone from "clone";

import "firebase/remote-config";

import { mockAiInterpretResult } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { INTERPRET_STATUS, NAVIGATION } from "@/constant";
import { spyUseRouter, SpyUseRouter, spyUseSearchParams, SpyUseSearchParams } from "@/testUtils/navigation";
import { advanceTimersByTime, API, flushPromise, render, setMockDate } from "@/testUtils/testUtils";
import { InterpretResult } from "@/types/model.api";
import InputDataModule from ".";

describe("InputDataModule", () => {
  let spySearchParams: SpyUseSearchParams;
  let spyRouter: SpyUseRouter;
  let mockApiAdapter: MockAdapter;
  let interpretResult: InterpretResult;

  const mockTransactionID = "labId";
  const userEvent = UserEvent.setup({ delay: null, advanceTimers: advanceTimersByTime });

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "exampleId") return mockTransactionID;
    });

    jest.useFakeTimers();
    setMockDate("2000-10-01");

    jest.spyOn(Api, "submitLabInterprets");
    jest.spyOn(Api, "getLabInterpretsByTransactionId");

    interpretResult = clone(mockAiInterpretResult);
    interpretResult.status = INTERPRET_STATUS.SUCCESS;

    mockApiAdapter = new MockAdapter(Api.apiAxios);
    mockApiAdapter.onGet(API.EXAMPLE_AI_INTERPRET_URL).reply(200, mockAiInterpretResult);
    mockApiAdapter.onPost(API.SUBMIT_LAB_INTERPRETS_URL).reply(200, { transactionID: mockTransactionID });
    mockApiAdapter.onGet(API.GET_LAB_INTERPRETS_ID_URL).reply(200, interpretResult);
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

    expect(spyRouter.replace).toHaveBeenCalledWith(NAVIGATION.AI_INTERPRET_TRY_EXAMPLE_DATA);
  });

  it("should call router push when click on use example data button", async () => {
    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "exampleId") return undefined;
    });
    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("use-example-data-button"));
    await advanceTimersByTime(1000);

    expect(spyRouter.replace).toHaveBeenCalledWith(NAVIGATION.AI_INTERPRET_TRY_EXAMPLE_DATA);
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

    await advanceTimersByTime(5000);
    await flushPromise();
    expect(screen.getByTestId("interpret-image-pending")).toBeInTheDocument();

    await advanceTimersByTime(60000);
    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledTimes(2);

    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });

  it("should display fetch interpret failed modal when submit health data network error", async () => {
    mockApiAdapter.onGet(API.GET_LAB_INTERPRETS_ID_URL).networkError();

    await renderInputDataModule();
    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await advanceTimersByTime(1000);
    await flushPromise();

    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockTransactionID);

    await advanceTimersByTime(1000);
    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });

  it("should redirect to Ai Interpret Result page when submit health data success", async () => {
    interpretResult.status = INTERPRET_STATUS.SUCCESS;

    await renderInputDataModule();

    await userEvent.click(screen.getByTestId("submit-interpret-button"));
    await advanceTimersByTime(1000);
    await flushPromise();

    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockTransactionID);

    await advanceTimersByTime(5000);
    await flushPromise();

    expect(spyRouter.replace).toHaveBeenCalledWith(`${NAVIGATION.AI_INTERPRET_RESULT}?transactionId=mock_id`);
  });
});
