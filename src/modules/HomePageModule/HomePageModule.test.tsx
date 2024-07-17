import * as RemoteConfig from "firebase/remote-config";

import { mockDashboardMenuConfigResult } from "@/__mocks__/data";
import { spyUseRouter } from "@/testUtils/navigation";
import { flushPromise, render } from "@/testUtils/testUtils";
import HomePageModule from ".";

describe("HomePageModule", () => {
  beforeEach(() => {
    spyUseRouter();

    jest.spyOn(RemoteConfig, "getValue").mockImplementation((_, key): any => {
      if (key === "DashboardMenu") {
        return { asString: () => JSON.stringify(mockDashboardMenuConfigResult) };
      }
    });
  });

  const renderHomePageModule = async () => {
    const view = render(<HomePageModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderHomePageModule();
    expect(asFragment()).toMatchSnapshot();
  });
});
