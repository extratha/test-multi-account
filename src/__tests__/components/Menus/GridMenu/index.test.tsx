import GridMenu from "@/components/Menus/GridMenu";
import { aiMenuList } from "@/constant/menu";
import { render, screen, userEvent } from "@/testUtils/testUtils";

describe("GridMenu Component", () => {
  const mockTFunction = (key: string) => key;

  const renderGridMenu = () => {
    return render(<GridMenu menus={aiMenuList(mockTFunction)} />);
  };

  it("should render correctly", async () => {
    const { asFragment } = renderGridMenu();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call router push when click menu item", async () => {
    renderGridMenu();

    await userEvent.click(screen.getByTestId("menu-item-0"));
    // TODO: expect router push with ?
  });
});
