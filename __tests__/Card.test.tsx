// Card.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "@/components/Card";

describe("Card", () => {
  test("renders title", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
