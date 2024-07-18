import { render } from "@/testUtils/testUtils";
import Tag, { TagProps } from ".";

describe("Tag", () => {
  let props: TagProps;

  beforeEach(() => {
    props = {
      name: "tag",
      text: "string",
    };
  });

  const renderTag = () => {
    return render(<Tag {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderTag();
    expect(asFragment()).toMatchSnapshot();
  });
});
