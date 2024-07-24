import * as RemoteConfig from "firebase/remote-config";

import { mockDashboardMenuConfigResult } from "@/__mocks__/data";
import { flushPromise, render } from "@/testUtils/testUtils";
import SymptomChecker from ".";

describe("SymptomChecker", () => {
  const renderSymptomChecker = async () => {
    const view = render(<SymptomChecker />);
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
    const { asFragment } = await renderSymptomChecker();
    expect(asFragment()).toMatchSnapshot();
  });
});
