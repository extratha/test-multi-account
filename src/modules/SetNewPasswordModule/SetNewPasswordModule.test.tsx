import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { apiUnauthorizedAxios } from "@/api/apiUnauthorize";
import { SpyUseRouter, spyUseRouter, spyUseSearchParams, SpyUseSearchParams } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import SetNewPasswordModule from ".";

describe("SetNewPasswordModule", () => {
  let mockApiAdapter: MockAdapter;
  let spySearchParams: SpyUseSearchParams;
  let spyRouter: SpyUseRouter;
  const mockToken = "token-1";

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();
    spyRouter = spyUseRouter();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "token") return mockToken;
    });

    mockApiAdapter = new MockAdapter(apiUnauthorizedAxios);
    mockApiAdapter.onGet(`${API.VALIDATE_RESET_PASSWORD_TOKEN}?${mockToken}`).reply(200);
  });

  const renderSetNewPasswordModule = async () => {
    const view = render(<SetNewPasswordModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderSetNewPasswordModule();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show dialog and click navigate to login when validate reset token error", async () => {
    mockApiAdapter.onGet(`${API.VALIDATE_RESET_PASSWORD_TOKEN}?${mockToken}`).reply(400);

    await renderSetNewPasswordModule();

    expect(screen.getByTestId("expired-dialog-title")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("expired-confirm-button"));

    expect(spyRouter.replace).toHaveBeenCalled();
  });
});
