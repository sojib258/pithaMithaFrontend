import Label from "@/components/atoms/label/Label";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Label", () => {
  it("should display label text", () => {
    render(<Label text="Success" />);

    const label = screen.getByText("Success");
    expect(label).toBeInTheDocument();
  });

  it("should apply custom styles via sx prop", () => {
    const customStyles = { color: "red" };
    render(<Label text="Styled Label" sx={customStyles} />);

    const label = screen.getByText("Styled Label");
    expect(label).toHaveStyle("color: red");
  });
});
