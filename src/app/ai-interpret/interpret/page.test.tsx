import { SpyUseSearchParams, spyUseSearchParams } from "@/testUtils/navigation";
import { flushPromise, render } from "@/testUtils/testUtils";
import AiInterpretResultPage from "./page";

describe("AiInterpretResultPage", () => {
  let spySearchParams: SpyUseSearchParams;

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "exampleId") return "labId";
    });
  });

  const renderAiInterpretResultPage = () => {
    return render(<AiInterpretResultPage />);
  };

  it("should render correctly", async () => {
    const { asFragment } = renderAiInterpretResultPage();
    await flushPromise();
    expect(asFragment()).toMatchSnapshot();
  });
});
