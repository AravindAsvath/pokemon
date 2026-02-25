const PokemonFilter = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
    />
  );
};

export default PokemonFilter;