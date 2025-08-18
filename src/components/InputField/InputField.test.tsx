import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

describe("InputField", () => {
  test("renders label and placeholder", () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  test("displays helper text", () => {
    render(<InputField label="Email" helperText="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  test("displays error message when invalid", () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<InputField label="Name" onChange={handleChange} />);
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("clears input when clear button is clicked", () => {
    render(<InputField label="Username" clearable value="Test" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByLabelText("Username")).toHaveValue("");
  });
});
