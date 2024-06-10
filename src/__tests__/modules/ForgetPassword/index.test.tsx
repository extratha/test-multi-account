import ForgetpasswordModule from "@/modules/ForgetPassword";
import { render } from "../../testUtils";

describe("ForgetPassword Module", () => {
  it("should render correctly", async () => {
    const { asFragment } = render(<ForgetpasswordModule />);
    expect(asFragment()).toMatchSnapshot();
  });
});
