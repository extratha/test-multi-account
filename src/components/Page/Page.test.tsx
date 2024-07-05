import { render } from "@/testUtils/testUtils";
import { Page } from ".";

describe("Page", () => {
  const renderPage = () => {
    return render(
      <Page>
        <div data-testid="child">Child content</div>
      </Page>
    );
  };

  it("renders children correctly", () => {
    const { asFragment } = renderPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
