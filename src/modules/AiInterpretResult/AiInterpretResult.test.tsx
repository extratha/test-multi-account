import MockAdapter from "axios-mock-adapter";

import { mockAiInterpretResult } from "@/__tests__/__mocks__/data";
import {
  API,
  SpyUseRouter,
  SpyUseSearchParams,
  flushPromise,
  render,
  screen,
  spyUseRouter,
  spyUseSearchParams,
  userEvent,
} from "@/__tests__/testUtils";
import axiosInstance from "@/utils/axios";
import AiInterpretResult from ".";

describe("AiInterpretResult", () => {
  let spySearchParams: SpyUseSearchParams;
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "id") return "interpretId";
    });

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.AI_INTERPRET_URL).reply(200, mockAiInterpretResult);

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

    expect(screen.getByTestId("ai-interpret-general-information-title-age")).toHaveTextContent("Age");
    expect(screen.getByTestId("ai-interpret-general-information-age-unit")).toHaveTextContent("year");

    expect(screen.getByTestId("ai-interpret-general-information-gender-value")).toHaveTextContent("Male");
    expect(screen.getByTestId("ai-interpret-general-information-gender-unit")).toHaveTextContent("");

    expect(screen.getByTestId("ai-interpret-general-information-temperature-value")).toHaveTextContent("38.00");
    expect(screen.getByTestId("ai-interpret-general-information-temperature-unit")).toHaveTextContent("°C");
  });

  it("should display lab information", async () => {
    await renderAiInterpretResult();

    expect(screen.getByTestId("ai-interpret-lab-title-hematologyCBC")).toHaveTextContent("Hematology");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-label")).toHaveTextContent("Hb");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-value")).toHaveTextContent("13.80 (g/dL)");
    expect(screen.getByTestId("ai-interpret-lab-hematologyCBC-hb_value-unit")).toHaveTextContent("(- g/dL)");

    expect(screen.getByTestId("ai-interpret-lab-title-bloodChemistry")).toHaveTextContent("Blood Chemistry");
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
