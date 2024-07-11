import { render } from "@testing-library/react";

import LocalesProvider, { LocalesProviderProps } from "./LocalesProvider";
import { LOCALE_LANGUAGE } from "@/config/i18n";

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
