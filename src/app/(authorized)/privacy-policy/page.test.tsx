import { spyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import PrivacyPolicyPage from "./page";

describe("PrivacyPolicyPage", () => {
  beforeEach(() => {
    spyUseRouter();
  });

  const renderPrivacyPolicyPage = () => {
    return render(<PrivacyPolicyPage />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderPrivacyPolicyPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
