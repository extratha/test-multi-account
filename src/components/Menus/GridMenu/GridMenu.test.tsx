import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { aiMenuList } from "@/constant/menu";
import { spyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import GridMenu from ".";

describe("GridMenu Component", () => {
  const mockTFunction = (key: string) => key;

  beforeEach(() => {
    spyUseRouter();
  });

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
