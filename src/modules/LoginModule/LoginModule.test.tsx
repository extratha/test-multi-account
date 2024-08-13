import { spyUseRouter } from "@/testUtils/navigation";
import { flushPromise, render } from "@/testUtils/testUtils";
import LoginModule from ".";

describe("LoginModule", () => {
  beforeEach(() => {
    spyUseRouter();
  });

  const renderLoginModule = async () => {
    const view = render(<LoginModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderLoginModule();
    expect(asFragment()).toMatchSnapshot();
  });
});
