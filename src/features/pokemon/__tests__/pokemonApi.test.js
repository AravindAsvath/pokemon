import axios from "axios";
import { fetchPokemonList, fetchPokemonDetail } from "../api/pokemonApi";

jest.mock("axios");

describe("pokemonApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchPokemonList returns data", async () => {
    const mockData = {
      data: {
        results: [{ name: "pikachu" }, { name: "bulbasaur" }],
      },
    };

    axios.get.mockResolvedValue(mockData);

    const result = await fetchPokemonList(2);

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=2"
    );
    expect(result.results.length).toBe(2);
  });

  test("fetchPokemonDetail returns data", async () => {
    const mockData = {
      data: { name: "pikachu" },
    };

    axios.get.mockResolvedValue(mockData);

    const result = await fetchPokemonDetail("pikachu");

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
    expect(result.name).toBe("pikachu");
  });
});