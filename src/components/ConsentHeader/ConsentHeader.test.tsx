import { render } from "@/testUtils/testUtils";
import ConsentHeader, { ConsentHeaderProps } from ".";

describe("ConsentHeader", () => {
  let props: ConsentHeaderProps;

  beforeEach(() => {
    props = {
      title: "Text Title",
    };
  });

  const renderConsentHeader = () => {
    return render(<ConsentHeader {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderConsentHeader();
    expect(asFragment()).toMatchSnapshot();
  });
});
