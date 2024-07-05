import { spyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import HomePageModule from ".";

describe("HomePageModule", () => {
  beforeEach(() => {
    spyUseRouter();
  });

  it("should render correctly", async () => {
    const { asFragment } = render(<HomePageModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
