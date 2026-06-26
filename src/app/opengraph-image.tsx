import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Distribuidora Souverain — On Premise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          color: "#F2EFE9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 14,
            color: "#8A8A8A",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Distribuidora
        </div>
        <div
          style={{
            fontSize: 160,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Souverain
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 18,
            color: "#C9A24B",
            textTransform: "uppercase",
            marginTop: 40,
          }}
        >
          On Premise
        </div>
      </div>
    ),
    { ...size },
  );
}
