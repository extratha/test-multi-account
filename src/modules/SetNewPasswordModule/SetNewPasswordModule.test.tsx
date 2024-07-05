import { render } from "@/testUtils/testUtils";
import SetNewPasswordModule from ".";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("SetNewPasswordModule", () => {
  it("should render correctly", async () => {
    const { asFragment } = render(<SetNewPasswordModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
