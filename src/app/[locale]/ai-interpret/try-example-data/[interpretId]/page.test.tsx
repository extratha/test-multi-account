import { flushPromise, render, spyUseParams } from "@/__tests__/testUtils";
import AiInterpretResultPage from "./page";
import { ConfigurationInterpretParams } from "@/modules/AiInterpretResult";

describe("AiInterpretResultPage", () => {
  let params: ConfigurationInterpretParams;

  beforeEach(() => {
    params = {
      interpretId: "interpretId",
    };

    spyUseParams().mockReturnValue(params);
  });

  const renderAiInterpretResultPage = () => {
    return render(<AiInterpretResultPage />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderAiInterpretResultPage();
    flushPromise();
    expect(asFragment()).toMatchSnapshot();
  });
});
