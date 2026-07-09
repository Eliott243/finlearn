import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface AfricaGlobeSvgProps {
  size: number;
  highlightOpacity?: number;
}

const R = 90;
const CX = 100;
const CY = 100;

/** Africa silhouette — recognizable on Atlantic-centered view */
const AFRICA_PATH =
  'M 98 44 C 108 40 120 42 128 50 C 134 56 136 64 132 72 ' +
  'C 138 78 142 88 140 98 C 145 108 143 118 136 126 ' +
  'C 130 134 128 142 130 152 C 128 162 120 170 110 168 ' +
  'C 102 166 96 158 94 148 C 88 138 84 126 86 114 ' +
  'C 78 108 74 96 78 84 C 80 72 76 62 82 54 C 88 48 94 44 98 44 Z';

const MADAGASCAR_PATH =
  'M 134 128 C 138 126 142 130 140 138 C 138 144 134 146 130 142 C 128 136 130 130 134 128 Z';

export function AfricaGlobeSvg({ size, highlightOpacity = 0 }: AfricaGlobeSvgProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <ClipPath id="globeClip">
          <Circle cx={CX} cy={CY} r={R} />
        </ClipPath>

        <RadialGradient id="oceanGrad" cx="38%" cy="32%" rx="65%" ry="65%">
          <Stop offset="0%" stopColor="#4DA8E8" />
          <Stop offset="45%" stopColor="#1E7BC4" />
          <Stop offset="100%" stopColor="#0B3D6E" />
        </RadialGradient>

        <LinearGradient id="landGrad" x1="0" y1="0" x2="0.4" y2="1">
          <Stop offset="0%" stopColor="#8FD468" />
          <Stop offset="55%" stopColor="#5DAF4A" />
          <Stop offset="100%" stopColor="#3D8B3A" />
        </LinearGradient>

        <LinearGradient id="desertGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E8D4A0" />
          <Stop offset="100%" stopColor="#C9A86A" />
        </LinearGradient>

        <RadialGradient id="specular" cx="30%" cy="25%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.35} />
          <Stop offset="60%" stopColor="#FFFFFF" stopOpacity={0.05} />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>

        <RadialGradient id="rimShadow" cx="75%" cy="80%" rx="45%" ry="45%">
          <Stop offset="0%" stopColor="#000000" stopOpacity={0} />
          <Stop offset="100%" stopColor="#000000" stopOpacity={0.35} />
        </RadialGradient>
      </Defs>

      {/* Atmospheric halo */}
      <Circle cx={CX} cy={CY} r={R + 6} fill="none" stroke="#4DA8E8" strokeWidth={2} opacity={0.2} />

      <G clipPath="url(#globeClip)">
        {/* Ocean */}
        <Circle cx={CX} cy={CY} r={R} fill="url(#oceanGrad)" />

        {/* ── Latitude / longitude grid ── */}
        {/* Parallels */}
        {[-60, -30, 0, 30, 60].map((lat) => {
          const y = CY - (lat / 90) * R;
          const rx = R * Math.cos((lat * Math.PI) / 180);
          return (
            <Ellipse
              key={`lat-${lat}`}
              cx={CX}
              cy={y}
              rx={rx}
              ry={rx * 0.12 + 2}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1}
            />
          );
        })}

        {/* Meridians */}
        {[-60, -30, 0, 30, 60].map((lon) => {
          const rx = R * Math.abs(Math.cos((lon * Math.PI) / 180)) * 0.35 + 8;
          return (
            <Ellipse
              key={`lon-${lon}`}
              cx={CX + (lon / 90) * R * 0.55}
              cy={CY}
              rx={rx}
              ry={R}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1}
            />
          );
        })}

        {/* ── Continents ── */}

        {/* South America (left edge) */}
        <Path
          d="M 38 58 C 48 48 58 52 62 68 C 66 88 64 108 58 128 C 52 142 44 138 40 120 C 34 100 32 78 38 58 Z"
          fill="url(#landGrad)"
        />

        {/* North America (top-left, partial) */}
        <Path
          d="M 32 42 C 48 28 68 30 78 42 C 82 52 74 58 62 56 C 50 54 38 50 32 42 Z"
          fill="url(#landGrad)"
        />

        {/* Europe */}
        <Path
          d="M 82 38 C 96 32 118 34 128 42 C 132 50 124 56 110 54 C 98 52 86 48 82 38 Z"
          fill="url(#landGrad)"
        />

        {/* Asia / Arabia (right) */}
        <Path
          d="M 128 44 C 148 38 168 48 172 62 C 168 72 158 76 148 70 C 140 64 132 56 128 44 Z"
          fill="url(#landGrad)"
        />
        <Path
          d="M 152 58 C 168 54 178 66 174 82 C 168 92 156 88 152 74 Z"
          fill="url(#landGrad)"
        />

        {/* Antarctica (bottom strip) */}
        <Path
          d="M 30 168 C 60 160 140 160 170 168 C 140 178 60 178 30 168 Z"
          fill="#E8F4FC"
          opacity={0.85}
        />

        {/* Sahara desert band inside Africa */}
        <Path
          d="M 86 58 C 100 54 118 56 128 64 C 126 74 118 80 104 78 C 92 76 86 68 86 58 Z"
          fill="url(#desertGrad)"
          opacity={0.9}
        />

        {/* Africa */}
        <Path d={AFRICA_PATH} fill="url(#landGrad)" />
        <Path d={MADAGASCAR_PATH} fill="url(#landGrad)" />

        {/* 3D lighting overlays */}
        <Circle cx={CX} cy={CY} r={R} fill="url(#specular)" />
        <Circle cx={CX} cy={CY} r={R} fill="url(#rimShadow)" />
      </G>

      {/* Globe rim */}
      <Circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={2.5}
      />
      <Circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="rgba(11,61,110,0.5)"
        strokeWidth={1}
      />

      {/* Africa highlight glow (animated) */}
      <Path
        d={AFRICA_PATH}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        opacity={highlightOpacity * 0.9}
      />
      <Path
        d={AFRICA_PATH}
        fill="none"
        stroke="#FFE566"
        strokeWidth={1.5}
        opacity={highlightOpacity * 0.7}
      />
    </Svg>
  );
}
