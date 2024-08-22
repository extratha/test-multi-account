import { render } from "@/testUtils/testUtils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AiInterpretAiResult, { AiInterpretAiResultProps } from "./AiInterpretAiResult";

describe("AiInterpretAiResult", () => {
  let props: AiInterpretAiResultProps;

  beforeEach(() => {
    props = {
      name: "ai-interpret-0",
      title: "title general",
      data: {
        title: "title general",
        descriptions: [
          {
            description: "language th",
            language: "TH",
          },
          {
            description: "language en",
            language: "EN",
          },
        ],
      },
    };

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  const renderAiInterpretAiResult = () => {
    return render(<AiInterpretAiResult {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderAiInterpretAiResult();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should switch language when click switch language button", async () => {
    renderAiInterpretAiResult();

    expect(screen.getByTestId("ai-interpret-0-description")).toHaveTextContent("language th");

    await userEvent.click(screen.getByTestId("ai-interpret-0-change-translate-button"));

    expect(screen.getByTestId("ai-interpret-0-description")).toHaveTextContent("language en");

    await userEvent.click(screen.getByTestId("ai-interpret-0-change-translate-button"));

    expect(screen.getByTestId("ai-interpret-0-description")).toHaveTextContent("language th");
  });

  it("should clipboard ai data when click copy button", async () => {
    renderAiInterpretAiResult();

    await userEvent.click(screen.getByTestId("ai-interpret-0-button-copy"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("title general\nlanguage th");
  });

  it("should hide switch language button when ai data has only language en", async () => {
    props.data.descriptions = [
      {
        description: "language en",
        language: "EN",
      },
    ];

    renderAiInterpretAiResult();

    expect(screen.queryByTestId("ai-interpret-0-change-translate-button")).not.toBeInTheDocument();
  });
});
