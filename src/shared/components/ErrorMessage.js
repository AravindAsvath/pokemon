import { useState, useEffect } from "react";

const pokemonFaces = ["😵", "😤", "💥", "⚡", "🔥"];



const ErrorMessage = ({ message = "A wild ERROR appeared!" }) => {
  const [face, setFace] = useState(pokemonFaces[0]);
  const [shaking, setShaking] = useState(true);
  const [hpDrained, setHpDrained] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % pokemonFaces.length;
      setFace(pokemonFaces[i]);
    }, 400);
    const stop = setTimeout(() => {
      clearInterval(interval);
      setFace("😵");
      setShaking(false);
    }, 2000);
    return () => { clearInterval(interval); clearTimeout(stop); };
  }, [message]);

  useEffect(() => {
    const t = setTimeout(() => setHpDrained(true), 300);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className="error-card">

=      <div className="corner corner--tl" />
      <div className="corner corner--tr" />
      <div className="corner corner--bl" />
      <div className="corner corner--br" />

      <div className="scanline" />

      <div className="error-header">
        <div className={`error-face ${shaking ? "error-face--shake" : "error-face--float"}`}>
          {face}
        </div>
        <div className="error-meta">
          <div className="error-label">⚠ CRITICAL ERROR</div>
          <div className="error-sub">LV. 404 &nbsp;•&nbsp; TYPE: BUG</div>
        </div>
        <div className="error-close">✕</div>
      </div>

      <div className="hp-section">
        <div className="hp-labels">
          <span>HP</span>
          <span>3/99</span>
        </div>
        <div className="hp-track">
          <div className={`hp-fill ${hpDrained ? "hp-fill--drained" : ""}`} />
        </div>
      </div>

      <div className="error-body">
        <p className="error-message">{message}</p>
      </div>

      <div className="error-footer">
        <button className="btn btn--primary">▶ RETRY</button>
        <button className="btn btn--ghost">▶ FLEE</button>
      </div>
    </div>
  );
};

export default ErrorMessage;