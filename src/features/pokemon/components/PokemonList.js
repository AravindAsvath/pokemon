import { useState, useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import SkeletonLoader from "../../../shared/components/SkeletonLoader";

const GridIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
    <rect x="1" y="2" width="14" height="2.5" rx="1" />
    <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
    <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
  </svg>
);

const PokemonList = () => {
  const { data, loading, error, page, setPage, totalPages } = usePokemonList();

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredPokemon = useMemo(() => {
    return data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="title">Pokémon</h1>
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search Pokémon..."
            disabled
          />
          <div className="view-toggle">
            <button 
              className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <GridIcon />
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon />
            </button>
          </div>
        </div>
        <SkeletonLoader count={12} viewMode={viewMode} />
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <h1 className="title">Pokémon</h1>

      <div className="search-row">
        <input
          className="search-input"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <GridIcon />
          </button>
          <button
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <ListIcon />
          </button>
        </div>
      </div>

      {filteredPokemon.length === 0 ? (
        <div className="no-data-container">No data found</div>
      ) : (
        <>
          <div className={viewMode === "grid" ? "grid-container" : "list-container"}>
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} viewMode={viewMode} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>

            <span style={{ color: "white" }}>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;