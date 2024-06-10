import SetNewPasswordModule from "@/modules/SetNewPasswordModule";
import { render } from "../../testUtils";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("LoginModule", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render correctly", async () => {
    const { asFragment } = render(<SetNewPasswordModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
