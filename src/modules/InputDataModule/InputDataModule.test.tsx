import { useRouter, useSearchParams } from "next/navigation";
import InputDataModule from ".";
import { render, screen, userEvent } from "../../__tests__/testUtils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("InputDataModule", () => {
  it("should render correctly", () => {
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === "id") return "";
        return null;
      }),
    });

    const { asFragment } = render(<InputDataModule />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("call router back when click back", async () => {
    const mockBack = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      back: mockBack,
    });

    render(<InputDataModule />);

    const backButton = screen.getByTestId("back-button");
    await userEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
