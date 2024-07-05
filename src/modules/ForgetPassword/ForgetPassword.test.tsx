import { spyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import ForgetPasswordModule from ".";

describe("ForgetPassword", () => {
  beforeEach(() => {
    spyUseRouter();
  });

  it("should render correctly", async () => {
    const { asFragment } = render(<ForgetPasswordModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
