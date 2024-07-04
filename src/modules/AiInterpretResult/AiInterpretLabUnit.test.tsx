import { render } from "@/testUtils/testUtils";
import AiInterpretLabUnit, { AiInterpretLabUnitProps } from "./AiInterpretLabUnit";

describe("AiInterpretLabUnit", () => {
  let props: AiInterpretLabUnitProps;

  beforeEach(() => {
    props = {
      name: "lab-unit",
      groupName: "lipidProfile",
      inputData: {
        key: "cholesterol_value",
        value: "200",
        unit: "mg/dL",
        range: [
          {
            value: "-",
            description: "abnormal",
          },
        ],
      },
    };
  });

  const renderAiInterpretLabUnit = () => {
    return render(<AiInterpretLabUnit {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderAiInterpretLabUnit();
    expect(asFragment()).toMatchSnapshot();
  });
});
