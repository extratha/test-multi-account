import HomePageModule from "@/modules/HomePageModule";
import { render } from "@/testUtils/testUtils";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("HomePageModule", () => {
  it("should render correctly", async () => {
    const { asFragment } = render(<HomePageModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
