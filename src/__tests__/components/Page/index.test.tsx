import { Page } from "@/components/Page";
import { render, screen } from "@/testUtils/testUtils";

describe("Page component", () => {
  it("renders children correctly", () => {
    render(
      <Page>
        <div data-testid="child">Child content</div>
      </Page>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });
});
