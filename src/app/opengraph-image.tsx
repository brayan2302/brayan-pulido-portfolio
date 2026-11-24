import { ImageResponse } from "next/og";

export const alt = "Brayan Pulido | AI Automation Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at 85% 20%, #4c1d95 0%, #09090d 55%, #050508 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Row: Domain + Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              fontSize: "20px",
              color: "#e9d5ff",
            }}
          >
            <span>www.brayanantonio.lat</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(16, 185, 129, 0.14)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              fontSize: "18px",
              color: "#6ee7b7",
            }}
          >
            <span>+6 Years Global Remote • EST</span>
          </div>
        </div>

        {/* Center: Name & Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#c084fc",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Brayan Pulido
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-2px",
              maxWidth: "980px",
            }}
          >
            AI Automation Engineer &amp; Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#cbd5e1",
              maxWidth: "880px",
              lineHeight: 1.4,
            }}
          >
            Sistemas autónomos con n8n + Agentes IA, plataformas en Next.js &amp; Supabase y contenido vertical de alto impacto.
          </div>
        </div>

        {/* Bottom: Tech Stack Pills */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          {["n8n Workflows", "Next.js 16", "OpenAI / Claude", "Supabase", "TypeScript"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 20px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  fontSize: "20px",
                  color: "#f1f5f9",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
