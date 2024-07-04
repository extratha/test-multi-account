import Loading from "@/modules/Loading";
import { render } from "@/testUtils/testUtils";

describe("LoadingModule", () => {
  it("should render correctly", async () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
