import { render } from "@/testUtils/testUtils";
import ModalLayer from ".";

describe("ModalLayer", () => {
  const renderModalLayer = () => {
    return render(<ModalLayer />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderModalLayer();
    expect(asFragment()).toMatchSnapshot();
  });
});
