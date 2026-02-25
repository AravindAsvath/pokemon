const SkeletonLoader = ({ count = 12, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="list-container">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card-list">
            <div className="skeleton-image shimmer" style={{ width: 80, height: 80, borderRadius: 4, flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="shimmer" style={{ width: '40%', height: 18, borderRadius: 2 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div className="shimmer" style={{ width: 64, height: 22, borderRadius: 2 }} />
                <div className="shimmer" style={{ width: 52, height: 22, borderRadius: 2 }} />
              </div>
            </div>
            <div className="shimmer" style={{ width: 120, height: 38, borderRadius: 3, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div
            className="shimmer"
            style={{
              position: "absolute",
              top: 12,
              right: 18,
              width: 36,
              height: 10,
              borderRadius: 2,
            }}
          />
          <div
            className="skeleton-image shimmer"
            style={{ borderRadius: 4, marginBottom: 12 }}
          />
          <div
            className="shimmer"
            style={{
              width: "60%",
              height: 18,
              borderRadius: 2,
              marginBottom: 14,
            }}
          />

          {/* Type badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <div
              className="shimmer"
              style={{ width: 64, height: 22, borderRadius: 2 }}
            />
            <div
              className="shimmer"
              style={{ width: 52, height: 22, borderRadius: 2, opacity: 0.6 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 14px",
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 3,
              marginBottom: 22,
            }}
          >
            {[1, 2].map((i) => (
              <div key={i}>
                <div
                  className="shimmer"
                  style={{
                    width: 48,
                    height: 15,
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
                <div
                  className="shimmer"
                  style={{ width: 36, height: 10, borderRadius: 2 }}
                />
              </div>
            ))}
          </div>
          <div
            className="shimmer"
            style={{ width: "100%", height: 38, borderRadius: 3 }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;