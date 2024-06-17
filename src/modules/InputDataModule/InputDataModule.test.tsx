import useInterpretInputDataConfig from "@/hooks/useInterpretInputDataConfig";
import "firebase/remote-config";
import { useRouter } from "next/navigation";
import InputDataModule from ".";
import { render, renderHook, screen, userEvent } from "../../__tests__/testUtils";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({ id: "" }),
}));
jest.mock("firebase/app", () => ({
  getApps: jest.fn().mockReturnValue([]),
  initializeApp: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));

jest.mock("firebase/remote-config", () => ({
  getRemoteConfig: jest.fn(() => ({ settings: { minimumFetchIntervalMillis: 60000 } })),
  fetchAndActivate: jest.fn().mockResolvedValue(""),
  getValue: jest.fn().mockReturnValue({ asString: jest.fn().mockReturnValue("[]") }),
}));
describe("InputDataModule", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<InputDataModule />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("call router back when click back", async () => {
    const mockBack = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    const { result } = renderHook(() => useInterpretInputDataConfig());
    // act(()=> {
    //   result.current.
    // })
    mockUseRouter.mockReturnValue({
      back: mockBack,
    });

    render(<InputDataModule />);

    const backButton = screen.getByTestId("back-button");
    await userEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
