import { render } from "@/__tests__/testUtils";
import UnauthorizedLayout from ".";

describe("UnauthorizedLayout", () => {
  const renderUnauthorizedLayout = () => {
    return render(
      <UnauthorizedLayout>
        <div data-testid="children" />
      </UnauthorizedLayout>
    );
  };

  it("should render correctly", () => {
    const { asFragment } = renderUnauthorizedLayout();
    expect(asFragment()).toMatchSnapshot();
  });
});
