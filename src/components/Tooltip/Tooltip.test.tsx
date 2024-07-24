import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from ".";

describe("Tooltip", () => {
  const renderTooltip = () => {
    return render(
      <Tooltip data-testid="test-tooltip" content={<span data-testid="test-tooltip-content">test</span>} />
    );
  };

  it("should render correctly", () => {
    const { asFragment } = renderTooltip();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display tooltip content when hover info icon", async () => {
    renderTooltip();

    await userEvent.hover(screen.getByTestId("test-tooltip"));

    await waitFor(() => {
      expect(screen.getByTestId("test-tooltip-content")).toBeVisible();
    });
  });
});
