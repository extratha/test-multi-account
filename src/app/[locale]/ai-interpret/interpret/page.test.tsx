import { SpyUseSearchParams, flushPromise, render, spyUseSearchParams } from "@/__tests__/testUtils";
import AiInterpretResultPage from "./page";

describe("AiInterpretResultPage", () => {
  let spySearchParams: SpyUseSearchParams;

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "id") return "id";
    });
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
