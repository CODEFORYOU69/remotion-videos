import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type SmokeParticle = {
  id: number;
  startX: number;
  driftX: number;
  delay: number;
  speed: number;
  size: number;
  opacity: number;
};

const generateParticles = (count: number, seed: number): SmokeParticle[] => {
  const particles: SmokeParticle[] = [];
  for (let i = 0; i < count; i++) {
    const s = Math.sin(seed + i * 1.618) * 10000;
    const rand = () => {
      const v = Math.sin(s + particles.length * 0.7 + i) * 10000;
      return v - Math.floor(v);
    };
    particles.push({
      id: i,
      startX: rand() * 100 - 50,
      driftX: (rand() - 0.5) * 40,
      delay: rand() * 60,
      speed: 0.8 + rand() * 0.6,
      size: 20 + rand() * 40,
      opacity: 0.08 + rand() * 0.12,
    });
  }
  return particles;
};

export const SmokeEffect: React.FC<{
  width?: number;
  height?: number;
  particleCount?: number;
  seed?: number;
}> = ({ width = 400, height = 300, particleCount = 12, seed = 42 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const particles = generateParticles(particleCount, seed);
  const cycleDuration = 4 * fps;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`-${width / 2} 0 ${width} ${height}`}
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id={`smoke-blur-${seed}`}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <radialGradient id={`smoke-grad-${seed}`}>
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {particles.map((p) => {
        const localFrame = (frame + p.delay) % cycleDuration;
        const progress = localFrame / cycleDuration;

        const y = interpolate(progress, [0, 1], [height, -p.size], {
          extrapolateRight: "clamp",
        });

        const x = p.startX + Math.sin(progress * Math.PI * 2) * p.driftX;

        const opacity = interpolate(
          progress,
          [0, 0.15, 0.5, 0.85, 1],
          [0, p.opacity, p.opacity * 0.8, p.opacity * 0.3, 0],
          { extrapolateRight: "clamp" }
        );

        const scale = interpolate(progress, [0, 1], [0.5, 1.8], {
          extrapolateRight: "clamp",
        });

        return (
          <circle
            key={p.id}
            cx={x}
            cy={y}
            r={p.size * scale}
            fill={`url(#smoke-grad-${seed})`}
            opacity={opacity}
            filter={`url(#smoke-blur-${seed})`}
          />
        );
      })}
    </svg>
  );
};
