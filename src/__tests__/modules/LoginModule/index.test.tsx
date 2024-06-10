import LoginModule from "@/modules/LoginModule";
import * as cookiesNext from "cookies-next";
import * as nextRouter from "next/navigation";
import { render } from "../../testUtils";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("LoginModule", () => {
  beforeEach(() => {
    (nextRouter.useRouter as any).mockReturnValue({ replace: jest.fn() });
    jest.spyOn(cookiesNext, "getCookie").mockReturnValue("accessToken");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const { asFragment } = render(<LoginModule />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("redirects to home page if accessToken exists", () => {
    jest.spyOn(cookiesNext, "getCookie").mockReturnValue("MOCK_ACCESS_TOKEN" as any);

    render(<LoginModule />);
  });

  it("renders login form if accessToken does not exist", () => {
    jest.spyOn(cookiesNext, "getCookie").mockReturnValue(null as any);

    render(<LoginModule />);
  });
});
