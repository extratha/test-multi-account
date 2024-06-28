import { render } from "@/__tests__/testUtils";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
  const renderPageTitle = () => {
    return render(<PageTitle>Text</PageTitle>);
  };

  it("should render correctly", () => {
    const { asFragment } = renderPageTitle();
    expect(asFragment()).toMatchSnapshot();
  });
});
