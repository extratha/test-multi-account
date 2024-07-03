import { render } from "@/__tests__/testUtils";
import TermsAndConsPage from "./page";

describe("TermsAndConditionsPage", () => {
  const renderTermsAndConditionPage = () => {
    return render(<TermsAndConsPage />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderTermsAndConditionPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
