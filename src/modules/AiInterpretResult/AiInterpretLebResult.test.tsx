import { render, userEvent, screen } from "@/__tests__/testUtils";
import AiInterpretLabResult, { AiInterpretLabResultProps } from "./AiInterpretLebResult";

describe("AiInterpretLabResult", () => {
  let props: AiInterpretLabResultProps;

  beforeEach(() => {
    props = {
      name: "lab",
      group: {
        groupName: "lipidProfile",
        data: [
          {
            key: "cholesterol_value",
            value: "208",
            unit: "mg/dL",
            range: [
              {
                value: "-",
                description: "abnormal",
              },
            ],
          },
        ],
      },
    };
  });

  const renderLabUnit = () => {
    return render(<AiInterpretLabResult {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderLabUnit();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show result lab when click button collapse", async () => {
    renderLabUnit();

    expect(screen.getByTestId("lab-lipidProfile-cholesterol_value-label")).not.toBeVisible();

    await userEvent.click(screen.getByTestId("lab-lipidProfile-button-collapse"));

    expect(screen.getByTestId("lab-lipidProfile-cholesterol_value-label")).toBeVisible();
  });
});
