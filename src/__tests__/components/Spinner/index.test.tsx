import Spinner from "@/components/Spinner";
import { render, screen } from "@testing-library/react";

describe("Spinner component", () => {
  it("renders spinner when show prop is true", () => {
    render(<Spinner show={true} />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("does not render spinner when show prop is false", () => {
    render(<Spinner show={false} />);
    const spinner = screen.queryByRole("progressbar");
    expect(spinner).not.toBeInTheDocument();
  });
});
