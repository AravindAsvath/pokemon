import { useNavigate } from "react-router-dom";

const typeColors = {
  grass: "#4CAF50",
  poison: "#9C27B0",
  fire: "#FF5722",
  water: "#2196F3",
  electric: "#FFC107",
  bug: "#8BC34A",
  normal: "#9E9E9E",
  psychic: "#E91E63",
  ice: "#00BCD4",
  dragon: "#3F51B5",
  dark: "#424242",
  fairy: "#FF80AB",
  fighting: "#795548",
  ground: "#FF9800",
  rock: "#607D8B",
  ghost: "#673AB7",
  steel: "#90A4AE",
  flying: "#64B5F6",
};

const PokemonCard = ({ pokemon, viewMode }) => {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType] || "#333";
  const navigate = useNavigate();

  if (viewMode === "list") {
    return (
      <div
        className="pokemon-list-card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: `linear-gradient(120deg, ${color}28 0%, #0a1628 70%)`,
          borderLeft: `3px solid ${color}`,
          borderRadius: "10px",
          padding: "8px 16px 8px 8px",
          cursor: "pointer",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <div style={{ width: "72px", height: "72px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            style={{ width: "64px", height: "64px", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ color: "white", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 6px 0" }}>
            {pokemon.name}
          </h3>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  backgroundColor: typeColors[t.type.name] || "#666",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontSize: "15px", fontWeight: "700" }}>{pokemon.height / 10} m</div>
            <div style={{ color: "#6b8cae", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>Height</div>
          </div>
          <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontSize: "15px", fontWeight: "700" }}>{pokemon.weight / 10} kg</div>
            <div style={{ color: "#6b8cae", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>Weight</div>
          </div>
        </div>

        <button
          style={{
            marginLeft: "8px",
            padding: "6px 14px",
            background: "transparent",
            border: `1px solid ${color}`,
            color: color,
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/pokemon/${pokemon.name}`);
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${color}22`}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          More Details
        </button>
      </div>
    );
  }

  return (
    <div
      className="pokemon-card"
      style={{
        background: `linear-gradient(145deg, ${color || "#333"}, #111)`,
      }}
    >
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />

      <h3 className="pokemon-name" style={{ color: "white" }}>
        {pokemon.name}
      </h3>

      <div className="type-container">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="type-badge"
            style={{ backgroundColor: typeColors[t.type.name] || "#666" }}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="stats">
        <div>
          <strong style={{ color: "white" }}>{pokemon.height / 10} m</strong>
          <span style={{ color: "white" }}>Height</span>
        </div>
        <div>
          <strong style={{ color: "white" }}>{pokemon.weight / 10} kg</strong>
          <span style={{ color: "white" }}>Weight</span>
        </div>
      </div>

      <button
        className="details-btn"
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      >
        More details
      </button>
    </div>
  );
};

export default PokemonCard;