import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonList from "../components/PokemonList";

jest.mock("../hooks/usePokemonList");
jest.mock("../components/PokemonCard", () => ({ pokemon }) => (
  <div>{pokemon.name}</div>
));
jest.mock("../../../shared/components/SkeletonLoader", () => ({ count }) => (
  <div data-testid="skeleton-loader">Loading {count} items</div>
));
jest.mock("../../../shared/components/ErrorMessage", () => ({ message }) => (
  <div>{message}</div>
));

const { usePokemonList } = require("../hooks/usePokemonList");

describe("PokemonList", () => {
  test("shows loading state", () => {
    usePokemonList.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<PokemonList />);

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
  });

  test("shows error state", () => {
    usePokemonList.mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch",
    });

    render(<PokemonList />);

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  test("renders pokemon list", () => {
    usePokemonList.mockReturnValue({
      data: [{ id: 1, name: "pikachu" }, { id: 2, name: "bulbasaur" }],
      loading: false,
      error: null,
      page: 1,
      setPage: jest.fn(),
      totalPages: 1,
    });

    render(<PokemonList />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  test("filters pokemon by name", () => {
    usePokemonList.mockReturnValue({
      data: [{ id: 1, name: "pikachu" }, { id: 2, name: "bulbasaur" }],
      loading: false,
      error: null,
      page: 1,
      setPage: jest.fn(),
      totalPages: 1,
    });

    render(<PokemonList />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    fireEvent.change(input, { target: { value: "pika" } });

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  test("toggles between grid and list view", () => {
    usePokemonList.mockReturnValue({
      data: [{ id: 1, name: "pikachu" }],
      loading: false,
      error: null,
      page: 1,
      setPage: jest.fn(),
      totalPages: 1,
    });

    render(<PokemonList />);

    const gridBtn = screen.getByLabelText(/grid view/i);
    const listBtn = screen.getByLabelText(/list view/i);

    expect(gridBtn).toHaveClass("active");
    expect(listBtn).not.toHaveClass("active");

    fireEvent.click(listBtn);

    expect(listBtn).toHaveClass("active");
    expect(gridBtn).not.toHaveClass("active");

    fireEvent.click(gridBtn);

    expect(gridBtn).toHaveClass("active");
    expect(listBtn).not.toHaveClass("active");
  });

  test("applies correct container class based on view mode", () => {
    usePokemonList.mockReturnValue({
      data: [{ id: 1, name: "pikachu" }],
      loading: false,
      error: null,
      page: 1,
      setPage: jest.fn(),
      totalPages: 1,
    });

    const { container } = render(<PokemonList />);

    expect(container.querySelector(".grid-container")).toBeInTheDocument();
    expect(container.querySelector(".list-container")).not.toBeInTheDocument();

    const listBtn = screen.getByLabelText(/list view/i);
    fireEvent.click(listBtn);

    expect(container.querySelector(".list-container")).toBeInTheDocument();
    expect(container.querySelector(".grid-container")).not.toBeInTheDocument();
  });
});