import Button from "@/components/atoms/button/Button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should display button text", () => {
    render(<Button text="Submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/submit/i);
  });

  it("should display arrow icon", () => {
    render(<Button arrowIcon={true} text="Submit" />);

    const button = screen.getByTestId("ArrowForwardIcon");
    expect(button).toBeInTheDocument();
  });

  it("should display plus icon", () => {
    render(<Button plusIcon={true} text="Submit" />);

    const button = screen.getByTestId("AddIcon");
    expect(button).toBeInTheDocument();
  });

  it("should display cart icon", () => {
    render(<Button cartIcon={true} text="Submit" />);

    const button = screen.getByTestId("ShoppingCartOutlinedIcon");
    expect(button).toBeInTheDocument();
  });

  it("should disabled when disabled props is true", () => {
    render(<Button text="Submit" disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button text="Submit" disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should have outlined variant when outlined prop is true", () => {
    render(<Button text="Submit" outlined={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiButton-outlined");
  });

  it("should apply custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    render(<Button text="Submit" customStyle={customStyle} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("backgroundColor: red");
  });

  it("should call onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Submit" onClick={handleClick} />);
    const button = screen.getByRole("button");
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
