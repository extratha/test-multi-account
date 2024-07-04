import clone from "clone";

import { mockTermsAndConsData } from "@/__mocks__/data";
import { render, screen, userEvent, waitFor } from "@/testUtils/testUtils";
import ConsentContent, { ConsentContentProps } from ".";

describe("ConsentContent", () => {
  let props: ConsentContentProps;

  beforeEach(() => {
    props = { name: "test", data: clone(mockTermsAndConsData.consent) };
  });

  const renderConsentContent = () => {
    return render(<ConsentContent {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderConsentContent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display services consent when services are empty", () => {
    props.data.services = [];
    renderConsentContent();

    expect(screen.queryByTestId("test-service")).not.toBeInTheDocument();
  });

  it("should collapse/expand service content when click service header", async () => {
    renderConsentContent();

    expect(screen.getByTestId("test-service-0-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-1-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-2-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-3-content")).not.toBeVisible();

    await userEvent.click(screen.getByTestId("test-service-0"));

    expect(screen.getByTestId("test-service-0-content")).toBeVisible();
    expect(screen.getByTestId("test-service-1-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-2-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-3-content")).not.toBeVisible();

    await userEvent.click(screen.getByTestId("test-service-1"));

    expect(screen.getByTestId("test-service-0-content")).toBeVisible();
    expect(screen.getByTestId("test-service-1-content")).toBeVisible();
    expect(screen.getByTestId("test-service-2-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-3-content")).not.toBeVisible();

    await userEvent.click(screen.getByTestId("test-service-0"));

    await waitFor(() => expect(screen.getByTestId("test-service-0-content")).not.toBeVisible());
    expect(screen.getByTestId("test-service-1-content")).toBeVisible();
    expect(screen.getByTestId("test-service-2-content")).not.toBeVisible();
    expect(screen.getByTestId("test-service-3-content")).not.toBeVisible();
  });
});
