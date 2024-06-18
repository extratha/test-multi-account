import "firebase/remote-config";
import { useRouter } from "next/navigation";
import InputDataModule from ".";
import { flushPromise, render, screen, userEvent } from "../../__tests__/testUtils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("InputDataModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderInputDataModule = async () => {
    const view = render(<InputDataModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderInputDataModule();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render page title", async () => {
    await renderInputDataModule();
    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toBeInTheDocument();
  });

  it("call router back when click back", async () => {
    const mockBack = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      back: mockBack,
    });
    await renderInputDataModule();

    const backButton = await screen.findByTestId("back-button");
    await userEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
