import { useSearchParams } from "next/navigation";
import InputDataModule from ".";
import { render } from "../../__tests__/testUtils";

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
});
