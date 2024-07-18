import { render } from "@testing-library/react";

import { LOCALE_LANGUAGE } from "@/config";
import LocalesProvider, { LocalesProviderProps } from "./LocalesProvider";

describe("LocalesProvider", () => {
  let props: LocalesProviderProps;

  beforeEach(() => {
    props = {
      lang: LOCALE_LANGUAGE.TH,
      resource: { text: "Display Text" },
      children: <div data-testid="children" />,
    };
  });

  const renderLocalesProvider = () => {
    return render(<LocalesProvider {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderLocalesProvider();
    expect(asFragment()).toMatchSnapshot();
  });
});
