import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonFilter from "../components/PokemonFilter";

describe("PokemonFilter", () => {
  test("renders input field", () => {
    render(<PokemonFilter value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const mockChange = jest.fn();

    render(<PokemonFilter value="" onChange={mockChange} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    fireEvent.change(input, { target: { value: "pika" } });

    expect(mockChange).toHaveBeenCalledWith("pika");
  });
});