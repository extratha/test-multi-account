import MockAdapter from "axios-mock-adapter";

import { mockAiInterpretResult } from "@/__tests__/__mocks__/data";
import {
  API,
  SpyUseRouter,
  flushPromise,
  render,
  screen,
  spyUseParams,
  spyUseRouter,
  userEvent,
} from "@/__tests__/testUtils";
import axiosInstance from "@/utils/axios";
import AiInterpretResult, { ConfigurationInterpretParams } from ".";

describe("AiInterpretResult", () => {
  let params: ConfigurationInterpretParams;
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    params = {
      interpretId: "interpretId",
    };

    spyUseParams().mockReturnValue(params);
    spyRouter = spyUseRouter();

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

  it("should navigate to example data when click back button", async () => {
    await renderAiInterpretResult();

    await userEvent.click(screen.getByTestId("ai-interpret-button-back"));

    expect(spyRouter.push).toHaveBeenCalled();
  });

  it("should copy to example data when click copy button", async () => {
    await renderAiInterpretResult();

    await userEvent.click(screen.getByTestId("ai-interpret-button-copy-0"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("description-ai-result");
  });
});
