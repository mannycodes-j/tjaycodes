'use client'

type OrbitNetworkBackgroundProps = {
  variant?: 'full' | 'panel'
}

type OrbitNode = {
  ring: number
  angle: number
  size: number
  image: string
  name: string
  duration: number
  reverse?: boolean
}

const FULL_RING_RADII = [150, 230, 320, 420]
const PANEL_RING_RADII = [72, 118, 164, 212]

const NODES: OrbitNode[] = [
  {
    ring: 0,
    angle: 36,
    size: 58,
    image: 'https://i.pravatar.cc/120?img=32',
    name: 'Orbit user 1',
    duration: 22,
  },
  {
    ring: 0,
    angle: 215,
    size: 52,
    image: 'https://i.pravatar.cc/120?img=48',
    name: 'Orbit user 2',
    duration: 22,
  },
  {
    ring: 1,
    angle: 115,
    size: 62,
    image: 'https://i.pravatar.cc/120?img=24',
    name: 'Orbit user 3',
    duration: 30,
    reverse: true,
  },
  {
    ring: 1,
    angle: 262,
    size: 50,
    image: 'https://i.pravatar.cc/120?img=12',
    name: 'Orbit user 4',
    duration: 30,
    reverse: true,
  },
  {
    ring: 2,
    angle: 24,
    size: 66,
    image: 'https://i.pravatar.cc/120?img=5',
    name: 'Orbit user 5',
    duration: 36,
  },
  {
    ring: 2,
    angle: 172,
    size: 56,
    image: 'https://i.pravatar.cc/120?img=21',
    name: 'Orbit user 6',
    duration: 36,
  },
  {
    ring: 3,
    angle: 88,
    size: 64,
    image: 'https://i.pravatar.cc/120?img=46',
    name: 'Orbit user 7',
    duration: 44,
    reverse: true,
  },
  {
    ring: 3,
    angle: 238,
    size: 54,
    image: 'https://i.pravatar.cc/120?img=14',
    name: 'Orbit user 8',
    duration: 44,
    reverse: true,
  },
]

export default function OrbitNetworkBackground({
  variant = 'full',
}: OrbitNetworkBackgroundProps) {
  const ringRadii = variant === 'panel' ? PANEL_RING_RADII : FULL_RING_RADII
  const nodeScale = variant === 'panel' ? 0.78 : 1
  const centerClass =
    variant === 'panel'
      ? 'absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
      : 'absolute left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[78%]'

  return (
    <div
      className={
        variant === 'panel'
          ? 'pointer-events-none absolute inset-0 overflow-hidden'
          : 'pointer-events-none absolute inset-0 overflow-hidden'
      }
      aria-hidden="true"
    >
      <div className={centerClass}>
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0ea5e9]/28 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0d46a]/70 blur-md" />

        {ringRadii.map((radius, index) => (
          <div
            key={`ring-${radius}`}
            className="absolute left-1/2 top-1/2 rounded-full border-2 border-[#93c5fd]/70"
            style={{
              width: radius * 2,
              height: radius * 2,
              transform: 'translate(-50%, -50%)',
              opacity: 1 - index * 0.16,
            }}
          />
        ))}

        {NODES.map((node, index) => {
          const start = `${node.angle}deg`
          const end = `${node.angle + 360}deg`

          return (
            <div
              key={`node-${node.name}-${index}`}
              className={node.reverse ? 'orbit-node reverse' : 'orbit-node'}
              style={
                {
                  '--start-angle': start,
                  '--end-angle': end,
                  '--duration': `${node.duration}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_10px_24px_rgba(15,23,42,0.2),0_0_0_6px_rgba(240,212,106,0.35)]"
                style={{
                  width: node.size * nodeScale,
                  height: node.size * nodeScale,
                  transform: `translateX(${ringRadii[node.ring]}px)`,
                }}
              >
                <img
                  src={node.image}
                  alt={node.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .orbit-node {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(var(--start-angle));
          animation: orbit var(--duration) linear infinite;
        }

        .orbit-node.reverse {
          animation-direction: reverse;
        }

        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(var(--start-angle));
          }
          to {
            transform: translate(-50%, -50%) rotate(var(--end-angle));
          }
        }
      `}</style>
    </div>
  )
}
