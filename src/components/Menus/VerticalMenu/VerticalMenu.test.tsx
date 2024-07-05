import { spyUseParams, spyUsePathname } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import VerticalMenu from ".";

describe("VerticalMenu", () => {
  beforeEach(() => {
    spyUseParams({ locale: "th" });
    spyUsePathname("/test");
  });

  const renderVerticalMenu = () => {
    return render(<VerticalMenu />);
  };

  it("renders menu items correctly", () => {
    const { asFragment } = renderVerticalMenu();
    expect(asFragment()).toMatchSnapshot();
  });
});
