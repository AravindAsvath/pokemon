import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../api/pokemonApi";

export const usePokemonDetail = (name) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    fetchPokemonDetail(name)
      .then(setData)
      .catch(() => setError("Failed to fetch details"))
      .finally(() => setLoading(false));
  }, [name]);

  return { data, loading, error };
};