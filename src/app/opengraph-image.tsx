import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";
export const runtime = "nodejs";
export const alt = `${portfolio.name} | ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        background: "#121510",
        color: "#eeeeea",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 64, letterSpacing: "-3px" }}>
        {portfolio.name}
      </div>
      <div style={{ fontSize: 64, color: "#c1ee85", marginTop: 8 }}>
        {portfolio.role}
      </div>
      <div
        style={{
          fontSize: 26,
          color: "#a7aaa3",
          marginTop: 36,
          lineHeight: 1.5,
        }}
      >
        {portfolio.positioning}
      </div>
    </div>,
    size,
  );
}
