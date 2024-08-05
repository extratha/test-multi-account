import { render } from "@/testUtils/testUtils";
import FullScreenLoading from ".";

describe("FullScreenLoading", () => {
  const renderFullScreenLoading = () => {
    return render(<FullScreenLoading />);
  };

  it("should render correctly", () => {
    const { baseElement } = renderFullScreenLoading();
    expect(baseElement).toMatchSnapshot();
  });
});
