import { flushPromise, render } from "@/__tests__/testUtils";
import SymptomChecker from ".";

import * as RemoteConfig from "firebase/remote-config";

describe("SymptomChecker", () => {
  const renderSymptomChecker = async () => {
    const view = render(<SymptomChecker />);
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
    const { asFragment } = await renderSymptomChecker();
    expect(asFragment()).toMatchSnapshot();
  });
});
