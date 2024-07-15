import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { mockAiInterpretResult } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { webPaths } from "@/constant/webPaths";
import {
  spyUsePathname,
  SpyUseRouter,
  spyUseRouter,
  SpyUseSearchParams,
  spyUseSearchParams,
} from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import axiosInstance from "@/utils/axios";
import AiInterpretResult from ".";

describe("AiInterpretResult", () => {
  const mockInterpretId = "labId";

  let spySearchParams: SpyUseSearchParams;
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    jest.spyOn(Api, "getLabExampleId");
    jest.spyOn(Api, "getLabInterpretsByTransactionId");

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "exampleId") return mockInterpretId;
    });

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.EXAMPLE_AI_INTERPRET_URL).reply(200, mockAiInterpretResult);
    mockApiAdapter.onGet(API.GET_LAB_INTERPRETS_ID_URL).reply(200, mockAiInterpretResult);

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  const renderAiInterpretResult = async () => {
    const view = render(<AiInterpretResult />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderAiInterpretResult();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display general information", async () => {
    await renderAiInterpretResult();

    expect(screen.getByTestId("ai-interpret-general-information-title-age")).toHaveTextContent("อายุ");
    expect(screen.getByTestId("ai-interpret-general-information-age-unit")).toHaveTextContent("ปี");

    expect(screen.getByTestId("ai-interpret-general-information-gender-value")).toHaveTextContent("ชาย");
    expect(screen.getByTestId("ai-interpret-general-information-gender-unit")).toHaveTextContent("");

    expect(screen.getByTestId("ai-interpret-general-information-temperature-value")).toHaveTextContent("38.00");
    expect(screen.getByTestId("ai-interpret-general-information-temperature-unit")).toHaveTextContent("°C");
  });

  it("should display lab information by exampleId when exampleId param is set", async () => {
    spyUsePathname(`${webPaths.aiInterpret.aiInterpretResult}?exampleId=${mockInterpretId}`);

    await renderAiInterpretResult();

    expect(Api.getLabExampleId).toHaveBeenCalledWith(mockInterpretId);
    expect(Api.getLabInterpretsByTransactionId).not.toHaveBeenCalled();

    expect(screen.getByTestId("ai-interpret-lab-title-hematologyCBC")).toHaveTextContent("โลหิตวิทยา");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-label")).toHaveTextContent("Hb");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-value")).toHaveTextContent("13.80 (g/dL)");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-unit")).toHaveTextContent("(- g/dL)");

    expect(screen.getByTestId("ai-interpret-lab-title-bloodChemistry")).toHaveTextContent("สารเคมีในเลือด");
    expect(screen.getByTestId("ai-interpret-lab-bloodChemistry-uric_acid_value-label")).toHaveTextContent(
      "Uric Acid Test"
    );
  });

  it("should display lab information by transactionId when transactionId param is set", async () => {
    spyUsePathname(`${webPaths.aiInterpret.aiInterpretResult}?transactionId=${mockInterpretId}`);

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "transactionId") return mockInterpretId;
    });

    await renderAiInterpretResult();

    expect(Api.getLabInterpretsByTransactionId).toHaveBeenCalledWith(mockInterpretId);
    expect(Api.getLabExampleId).not.toHaveBeenCalled();

    expect(screen.getByTestId("ai-interpret-lab-title-hematologyCBC")).toHaveTextContent("โลหิตวิทยา");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-label")).toHaveTextContent("Hb");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-value")).toHaveTextContent("13.80 (g/dL)");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-unit")).toHaveTextContent("(- g/dL)");

    expect(screen.getByTestId("ai-interpret-lab-title-bloodChemistry")).toHaveTextContent("สารเคมีในเลือด");
    expect(screen.getByTestId("ai-interpret-lab-bloodChemistry-uric_acid_value-label")).toHaveTextContent(
      "Uric Acid Test"
    );
  });

  it("should navigate to example data when click back button", async () => {
    await renderAiInterpretResult();

    await userEvent.click(screen.getByTestId("ai-interpret-button-back"));

    expect(spyRouter.push).toHaveBeenCalled();
  });

  it("should navigate to edit data when click edit button", async () => {
    await renderAiInterpretResult();

    await userEvent.click(screen.getByTestId("ai-interpret-button-edit"));

    expect(spyRouter.push).toHaveBeenCalled();
  });

  it("should copy to example data when click copy button", async () => {
    await renderAiInterpretResult();

    await userEvent.click(screen.getByTestId("ai-interpret-button-copy-0"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("description-ai-result");
  });
});
