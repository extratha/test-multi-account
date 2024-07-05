import { render } from "@/testUtils/testUtils";
import Loading from ".";

describe("LoadingModule", () => {
  it("should render correctly", async () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
