import { render } from "@/testUtils/testUtils";

import { mockHtml } from "@/__mocks__/data";
import ConsentContentHtml, { ConsentContentHtmlProps } from "./ConsentContentHtml";

describe("Html", () => {
  let props: ConsentContentHtmlProps;

  beforeEach(() => {
    props = {
      name: "consent",
      html: mockHtml,
    };
  });

  const renderHtml = () => {
    return render(<ConsentContentHtml {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderHtml();
    expect(asFragment()).toMatchSnapshot();
  });
});
