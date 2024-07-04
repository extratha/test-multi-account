import * as RemoteConfig from "firebase/remote-config";

import { flushPromise, render } from "@/testUtils/testUtils";

import SymptomCheckerPage from "./page";

describe("SymptomCheckerPage", () => {
  const renderSymptomCheckerPage = async () => {
    const view = render(<SymptomCheckerPage />);
    await flushPromise();
    return view;
  };

  beforeEach(() => {
    const spyRemoteAsString = jest.fn().mockImplementation(() => {
      return JSON.stringify({ url: "http://web-url" });
    });

    jest.spyOn(RemoteConfig, "getValue").mockReturnValue({ asString: spyRemoteAsString } as any);
  });

  it("should render correctly", async () => {
    const { asFragment } = await renderSymptomCheckerPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
