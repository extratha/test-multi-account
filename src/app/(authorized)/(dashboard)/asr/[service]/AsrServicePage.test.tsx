import * as RemoteConfig from "firebase/remote-config";

import { mockDashboardMenuConfigResult } from "@/__mocks__/data";
import * as UsePageLoadingStore from "@/store/usePageLoadingStore";
import { PageLoadingStore } from "@/store/usePageLoadingStore";
import * as UseUserProfileStore from "@/store/useUserProfileStore";
import { UserProfileStore } from "@/store/useUserProfileStore";
import { spyUseParams } from "@/testUtils/navigation";
import { flushPromise, render } from "@/testUtils/testUtils";
import AsrService from "./page";

jest.mock("@/store/usePageLoadingStore", () => {
  return { ...jest.requireActual("@/store/usePageLoadingStore"), __esModule: true };
});

jest.mock("@/store/useUserProfileStore", () => {
  return { ...jest.requireActual("@/store/useUserProfileStore"), __esModule: true };
});

describe("AsrServicePage", () => {
  let mockPageLoadingStore: PageLoadingStore;
  let mockUserProfileStore: UserProfileStore;

  beforeEach(() => {
    spyUseParams({ service: "order-asr" });

    mockPageLoadingStore = {
      isPageLoading: false,
      setPageLoading: jest.fn(),
    };

    mockUserProfileStore = {
      data: { corporate: "corporate" },
    } as UserProfileStore;

    jest.spyOn(UsePageLoadingStore, "default").mockImplementation(() => mockPageLoadingStore);
    jest.spyOn(UseUserProfileStore, "default").mockImplementation(() => mockUserProfileStore);

    jest.spyOn(RemoteConfig, "getValue").mockImplementation((_, key): any => {
      if (key === "DashboardMenu") {
        return { asString: () => JSON.stringify(mockDashboardMenuConfigResult) };
      }
    });
  });

  const renderAsrService = async () => {
    const view = render(<AsrService />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderAsrService();
    expect(asFragment()).toMatchSnapshot();
  });
});
