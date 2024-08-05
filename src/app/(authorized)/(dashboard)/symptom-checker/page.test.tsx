import * as RemoteConfig from "firebase/remote-config";

import { flushPromise, render } from "@/testUtils/testUtils";

import { mockDashboardMenuConfigResult } from "@/__mocks__/data";
import SymptomCheckerPage from "./page";

describe("SymptomCheckerPage", () => {
  const renderSymptomCheckerPage = async () => {
    const view = render(<SymptomCheckerPage />);
    await flushPromise();
    return view;
  };

  beforeEach(() => {
    jest.spyOn(RemoteConfig, "getValue").mockImplementation((_, key): any => {
      if (key === "DashboardMenu") {
        return { asString: () => JSON.stringify(mockDashboardMenuConfigResult) };
      }
    });
  });

  it("should render correctly", async () => {
    const { asFragment } = await renderSymptomCheckerPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
