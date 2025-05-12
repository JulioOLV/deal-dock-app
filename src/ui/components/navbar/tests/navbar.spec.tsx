import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { emitter } from "@/infra/event/mitt/event-bus";
import { Navbar } from "../navbar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/infra/event/mitt/event-bus", () => ({
  emitter: {
    emit: jest.fn(),
  },
}));

const makeSut = (): RenderResult => render(
  <Navbar />
);

describe("Navbar Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("should render the logo", () => {
    const sut = makeSut();
    const logo = sut.getByAltText("DealDock Logo");
    expect(logo).toBeInTheDocument();
  });

  test("should render the search input and button", () => {
    const sut = makeSut();
    const searchInput = sut.getByPlaceholderText("Buscar produtos...");
    const searchButton = sut.getByRole("button");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("should update the search input value when typing", () => {
    const sut = makeSut();
    const searchInput = sut.getByPlaceholderText("Buscar produtos...");
    fireEvent.change(searchInput, { target: { value: "smartphone" } });
    expect(searchInput).toHaveValue("smartphone");
  });

  test("should call router.push and emitter.emit on form submission", () => {
    const sut = makeSut();
    const searchInput = sut.getByPlaceholderText("Buscar produtos...");
    const form = sut.getByTestId("search");

    fireEvent.change(searchInput, { target: { value: "smartphone" } });
    fireEvent.submit(form);

    expect(mockPush).toHaveBeenCalledWith("/?product=smartphone&offset=0");
    expect(emitter.emit).toHaveBeenCalledWith(
      "product-search-editted",
      "smartphone"
    );
  });

  it("should prevent form submission if search input is empty", () => {
    const sut = makeSut();
    const form = sut.getByTestId("search");

    fireEvent.submit(form);

    expect(mockPush).not.toHaveBeenCalled();
    expect(emitter.emit).not.toHaveBeenCalled();
  });
});