import { screen } from "@testing-library/react";

import { usePageLoadingStore } from "@/store";
import { spyUsePathname } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import FullScreenLoading from ".";

jest.mock("@/store", () => ({
  usePageLoadingStore: jest.fn(),
}));

describe("FullScreenLoading", () => {
  const setPageLoadingMock = jest.fn();

  beforeEach(() => {
    spyUsePathname("/path");

    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: true,
      setPageLoading: setPageLoadingMock,
    });
  });

  const renderFullScreenLoading = () => {
    return render(<FullScreenLoading />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderFullScreenLoading();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not show fullscreen loading when isPageLoading is false", () => {
    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: false,
      setPageLoading: setPageLoadingMock,
    });

    renderFullScreenLoading();
    expect(screen.queryByTestId("full-screen-loading")).not.toBeInTheDocument();
  });
});
