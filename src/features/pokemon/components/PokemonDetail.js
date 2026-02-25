import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import SkeletonLoader from "../../../shared/components/SkeletonLoader";
import { FaArrowLeft } from "react-icons/fa";

const TYPE_PALETTE = {
  fire:     { from: "#FF6B35", to: "#FF2D55", glow: "#FF6B3566", badge: "#FF6B35" },
  water:    { from: "#0091EA", to: "#1565C0", glow: "#0091EA66", badge: "#0091EA" },
  grass:    { from: "#00C853", to: "#1B5E20", glow: "#00C85366", badge: "#00C853" },
  electric: { from: "#FFD600", to: "#F57F17", glow: "#FFD60066", badge: "#FFD600" },
  psychic:  { from: "#E91E63", to: "#880E4F", glow: "#E91E6366", badge: "#E91E63" },
  ice:      { from: "#80DEEA", to: "#006064", glow: "#80DEEA66", badge: "#80DEEA" },
  dragon:   { from: "#7B1FA2", to: "#1A237E", glow: "#7B1FA266", badge: "#7B1FA2" },
  dark:     { from: "#37474F", to: "#102027", glow: "#37474F66", badge: "#546E7A" },
  fairy:    { from: "#F48FB1", to: "#880E4F", glow: "#F48FB166", badge: "#F48FB1" },
  fighting: { from: "#BF360C", to: "#3E2723", glow: "#BF360C66", badge: "#BF360C" },
  poison:   { from: "#6A1B9A", to: "#1A237E", glow: "#6A1B9A66", badge: "#AB47BC" },
  ground:   { from: "#8D6E63", to: "#3E2723", glow: "#8D6E6366", badge: "#A1887F" },
  rock:     { from: "#78909C", to: "#263238", glow: "#78909C66", badge: "#90A4AE" },
  bug:      { from: "#33691E", to: "#1B5E20", glow: "#8BC34A66", badge: "#8BC34A" },
  ghost:    { from: "#4527A0", to: "#1A237E", glow: "#7C4DFF66", badge: "#7C4DFF" },
  steel:    { from: "#546E7A", to: "#263238", glow: "#90A4AE66", badge: "#90A4AE" },
  flying:   { from: "#1565C0", to: "#0D47A1", glow: "#42A5F566", badge: "#42A5F5" },
  normal:   { from: "#757575", to: "#212121", glow: "#9E9E9E44", badge: "#9E9E9E" },
};

const STAT_COLORS = {
  hp:               "#FF5252",
  attack:           "#FF7043",
  defense:          "#42A5F5",
  "special-attack": "#AB47BC",
  "special-defense":"#26C6DA",
  speed:            "#FFCA28",
};

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = usePokemonDetail(name);
  const [activeTab, setActiveTab] = useState("info");
  const [tabKey, setTabKey] = useState(0);

  if (loading) return <SkeletonLoader count={4} />;
  if (error)   return <ErrorMessage message={error} />;
  if (!data)   return null;

  const mainType = data.types?.[0]?.type?.name ?? "normal";
  const palette  = TYPE_PALETTE[mainType] ?? TYPE_PALETTE.normal;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const switchTab = (t) => { setActiveTab(t); setTabKey((k) => k + 1); };

  const renderContent = () => {
    switch (activeTab) {

      case "info":
        return (
          <div className="pd-content" key={tabKey}>
            <div className="pd-info-grid">
              <div className="pd-info-card">
                <div className="pd-info-label">Height</div>
                <div className="pd-info-value">
                  {data.height / 10}<span className="pd-info-unit">m</span>
                </div>
              </div>
              <div className="pd-info-card">
                <div className="pd-info-label">Weight</div>
                <div className="pd-info-value">
                  {data.weight / 10}<span className="pd-info-unit">kg</span>
                </div>
              </div>
              <div className="pd-info-card pd-info-card--full">
                <div className="pd-info-label">Base Experience</div>
                <div className="pd-info-value">{data.base_experience}</div>
              </div>
            </div>
          </div>
        );

      case "stats":
        return (
          <div className="pd-content" key={tabKey}>
            {data.stats.map((s) => {
              const key   = s.stat.name;
              const fill  = Math.min((s.base_stat / 255) * 100, 100);
              const color = STAT_COLORS[key] ?? "#aaa";
              return (
                <div key={key} className="pd-stat-row">
                  <span className="pd-stat-label">{key.replace("-", " ")}</span>
                  <div className="pd-stat-track">
                    <div
                      className="pd-stat-fill"
                      style={{
                        width: `${fill}%`,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                      }}
                    />
                  </div>
                  <span className="pd-stat-val">{s.base_stat}</span>
                </div>
              );
            })}
          </div>
        );

      case "abilities":
        return (
          <div className="pd-content" key={tabKey}>
            {data.abilities.map((a) => (
              <div key={a.ability.name} className="pd-ability">
                <div className="pd-ability-dot" style={{ background: palette.badge }} />
                {cap(a.ability.name)}
                {a.is_hidden && <span className="pd-hidden-tag">Hidden</span>}
              </div>
            ))}
          </div>
        );

      case "moves":
        return (
          <div className="pd-content" key={tabKey}>
            <div className="pd-moves-wrap">
              {data.moves.slice(0, 32).map((m) => (
                <span key={m.move.name} className="pd-move">
                  {cap(m.move.name)}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const pokeId = data.id ? String(data.id).padStart(3, "0") : "";

  return (
    <div className="pd-root">
      <div className="pd-blob pd-blob-1" style={{ background: palette.from }} />
      <div className="pd-blob pd-blob-2" style={{ background: palette.to }} />

      <div className="pd-card">
       <div
          className="pd-hero-stripe"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
        />

        <button className="pd-back" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>

        {pokeId && <div className="pd-number">#{pokeId}</div>}

        <div className="pd-body">

          <div className="pd-left">
            <div className="pd-img-wrap">
              <div
                className="pd-img-ring"
                style={{ background: `radial-gradient(circle, ${palette.from}, transparent 70%)` }}
              />
              <img
                className="pd-img"
                style={{ filter: `drop-shadow(0 20px 60px ${palette.glow})` }}
                src={data.sprites?.other?.["official-artwork"]?.front_default}
                alt={data.name}
              />
            </div>

            <div className="pd-type-badges">
              {data.types.map((t) => {
                const tp = TYPE_PALETTE[t.type.name] ?? TYPE_PALETTE.normal;
                return (
                  <span
                    key={t.type.name}
                    className="pd-badge"
                    style={{
                      background:  `${tp.badge}33`,
                      borderColor: `${tp.badge}55`,
                      color:        tp.badge,
                    }}
                  >
                    {cap(t.type.name)}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="pd-right">
            <h1 className="pd-name">{cap(data.name)}</h1>

            <div className="pd-tabs">
              {["info", "stats", "abilities", "moves"].map((t) => (
                <button
                  key={t}
                  className={`pd-tab${activeTab === t ? " active" : ""}`}
                  onClick={() => switchTab(t)}
                  style={
                    activeTab === t
                      ? { background: `${palette.badge}33`, color: palette.badge }
                      : {}
                  }
                >
                  {cap(t)}
                </button>
              ))}
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;