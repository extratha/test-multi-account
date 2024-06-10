import ProjectCoverLayout from "@/components/ProjectCoverLayout";
import { screen } from "@testing-library/react";
import { render } from "../../testUtils";

describe("ProjectCoverLayout", () => {
  it("renders children", () => {
    render(
      <ProjectCoverLayout>
        <div>Child Component</div>
      </ProjectCoverLayout>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("to match snap", async () => {
    const { asFragment } = render(
      <ProjectCoverLayout>
        <div>Child Component</div>
      </ProjectCoverLayout>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
