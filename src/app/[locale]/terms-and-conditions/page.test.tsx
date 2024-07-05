import { spyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import TermsAndConsPage from "./page";

describe("TermsAndConditionsPage", () => {
  beforeEach(() => {
    spyUseRouter();
  });

  const renderTermsAndConditionPage = () => {
    return render(<TermsAndConsPage />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderTermsAndConditionPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
