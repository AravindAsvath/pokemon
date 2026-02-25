import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit) => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
  return response.data;
};

export const fetchPokemonPage = async (limit, offset) => {
  const response = await axios.get(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const fetchPokemonDetail = async (name) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};