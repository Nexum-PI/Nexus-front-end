import { useId } from "react";

// Selo "A Casa do Tênis" (guia visual NEXUM v1).
// SVG inline para herdar a fonte Lilita One carregada no index.html.
// useId evita conflito de ids quando há mais de um logo na mesma página.
export function Logo({ size = 48, title = "A Casa do Tênis" }) {
  const uid = useId().replace(/:/g, "");
  const top = `top-${uid}`;
  const bot = `bot-${uid}`;
  const clip = `clip-${uid}`;
  const shoe = `shoe-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={{ fontFamily: "var(--heading)", flex: "none" }}
    >
      <defs>
        <path id={top} d="M 88 200 A 112 112 0 0 1 312 200" />
        <path id={bot} d="M 65 200 A 135 135 0 0 0 335 200" />
        <clipPath id={clip}>
          <circle cx="200" cy="200" r="168" />
        </clipPath>
        <g id={shoe}>
          <path
            d="M0 34 C0 24 8 20 18 18 L36 12 C46 8 54 2 62 0 L74 4 C78 16 90 22 104 26 C108 28 108 34 108 36 L108 40 L0 40 Z"
            fill="#f3e9c6"
          />
          <path
            d="M0 36 H108 V46 C108 50 104 52 100 52 H8 C3 52 0 49 0 45 Z"
            fill="#f3e9c6"
            opacity=".55"
          />
          <path
            d="M30 20 L50 30 M40 15 L58 24"
            stroke="#14283d"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </defs>

      <circle cx="200" cy="200" r="196" fill="#14283d" />
      <circle cx="200" cy="200" r="186" fill="none" stroke="#f3e9c6" strokeWidth="3" />
      <g clipPath={`url(#${clip})`}>
        <path d="M0 236 Q200 266 400 236 V400 H0 Z" fill="#f3e9c6" />
      </g>

      <text fontSize="60" fill="#f3e9c6" letterSpacing="5" textAnchor="middle">
        <textPath href={`#${top}`} startOffset="50%">A CASA</textPath>
      </text>
      <text fontSize="50" fill="#14283d" letterSpacing="4" textAnchor="middle">
        <textPath href={`#${bot}`} startOffset="50%">DO TÊNIS</textPath>
      </text>

      {/* Telhado da casa */}
      <g fill="none" stroke="#f3e9c6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M140 160 L200 112 L260 160" />
        <path d="M228 128 V114 H240 V140" />
      </g>

      {/* Par de tênis */}
      <g transform="translate(104 172) rotate(-4) scale(.8)">
        <use href={`#${shoe}`} />
      </g>
      <g transform="translate(206 172) rotate(-4) scale(.8)">
        <use href={`#${shoe}`} />
      </g>

      {/* Raio e ano de fundação */}
      <path d="M70 150 L58 174 H68 L62 196 L82 166 H72 Z" fill="#f3e9c6" />
      <g fill="#f3e9c6" fontSize="26" textAnchor="middle">
        <text x="322" y="176">20</text>
        <text x="322" y="202">23</text>
      </g>
    </svg>
  );
}
