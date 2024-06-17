import "firebase/remote-config";
import { useRouter } from "next/navigation";
import InputDataModule from ".";
import { act, render, screen, userEvent } from "../../__tests__/testUtils";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({ id: "" }),
}));
describe("InputDataModule", () => {
  it("should render correctly", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const { asFragment } = await render(<InputDataModule />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("call router back when click back", async () => {
    const mockBack = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      back: mockBack,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<InputDataModule />);
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const backButton = screen.getByTestId("back-button");
      await userEvent.click(backButton);

      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });
});
