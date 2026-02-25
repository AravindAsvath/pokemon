import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom");
jest.mock("../hooks/usePokemonDetail");
jest.mock("../../../shared/components/ErrorMessage", () => ({ message }) => (
  <div>{message}</div>
));
jest.mock("../../../shared/components/SkeletonLoader", () => ({ count }) => (
  <div>Loading</div>
));

const { useParams, useNavigate } = require("react-router-dom");
const { usePokemonDetail } = require("../hooks/usePokemonDetail");

let PokemonDetail;

beforeAll(async () => {
  PokemonDetail = (await import("../components/PokemonDetail")).default;
});

beforeEach(() => {
  useParams.mockReturnValue({ name: "pikachu" });
  useNavigate.mockReturnValue(jest.fn());
});

describe("PokemonDetail", () => {
  test("shows loading state", () => {
    usePokemonDetail.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<PokemonDetail />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pokemon detail", () => {
    usePokemonDetail.mockReturnValue({
      loading: false,
      error: null,
      data: {
        name: "pikachu",
        height: 4,
        weight: 60,
        sprites: { 
          other: {
            "official-artwork": {
              front_default: "image.png"
            }
          }
        },
        types: [{ type: { name: "electric" } }],
        abilities: [{ ability: { name: "static" } }],
      },
    });

    render(<PokemonDetail />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("0.4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  test("shows error state", () => {
    usePokemonDetail.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed",
    });

    render(<PokemonDetail />);

    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });
});