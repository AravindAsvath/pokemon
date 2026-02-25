import { useEffect, useState } from "react";
import axios from "axios";

const LIMIT = 12;

export const usePokemonList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const offset = (page - 1) * LIMIT;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
        );

        setTotalCount(res.data.count);

        const detailedPokemon = await Promise.all(
          res.data.results.map((p) => axios.get(p.url))
        );

        setData(detailedPokemon.map((p) => p.data));
      } catch (err) {
        setError("Failed to fetch Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page,offset]);

  const totalPages = Math.ceil(totalCount / LIMIT);

  return { data, loading, error, page, setPage, totalPages };
};