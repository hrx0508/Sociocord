import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const av = (n) => `https://i.pravatar.cc/120?img=${n}`

function Float({ children, className = '', delay = 0, amp = 10 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function Avatar({ n, size = 56, ring = 'ring-sky/70' }) {
  return (
    <img
      src={av(n)}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`rounded-full object-cover ring-2 ${ring} shadow-[0_0_24px_rgba(96,165,250,.5)]`}
    />
  )
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto hidden h-[540px] w-full max-w-[600px] md:block" aria-hidden>
      {/* crystal shapes */}
      <div
        className="absolute right-0 top-10 h-[360px] w-[360px] opacity-70"
        style={{
          background: 'linear-gradient(135deg, rgba(96,165,250,.35), rgba(124,58,237,.25) 60%, transparent)',
          clipPath: 'polygon(50% 0, 100% 30%, 90% 85%, 40% 100%, 0 60%, 10% 20%)',
        }}
      />
      <div
        className="absolute bottom-6 right-6 h-[200px] w-[260px]"
        style={{
          background: 'linear-gradient(160deg, #a855f7, #4c1d95 70%)',
          clipPath: 'polygon(20% 0, 80% 10%, 100% 55%, 70% 100%, 15% 90%, 0 40%)',
          boxShadow: '0 0 80px rgba(168,85,247,.6)',
          filter: 'drop-shadow(0 0 30px rgba(168,85,247,.5))',
        }}
      />

      {/* connecting lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 540" fill="none">
        <g stroke="rgba(147,197,253,.45)" strokeWidth="1.5">
          <path d="M310 70 H150 Q110 70 110 110 V230" />
          <path d="M470 160 V230 H330" />
          <path d="M110 230 L60 330" />
          <path d="M330 300 L150 400" />
        </g>
      </svg>

      {/* AI bubble */}
      <Float className="left-[48%] top-2 flex items-center gap-3" amp={8}>
        <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sky to-violet shadow-[0_0_40px_rgba(96,165,250,.8)] ring-4 ring-sky/30">
          <Sparkles size={34} />
        </span>
        <span className="glass whitespace-nowrap rounded-2xl px-4 py-3 text-sm text-white/80">
          Summarize this server<br />for me…
        </span>
      </Float>

      {/* Tech Builders card */}
      <Float className="right-4 top-[130px]" delay={0.6}>
        <div className="glass flex w-[270px] items-center gap-4 rounded-2xl border-sky/40 p-4 shadow-[0_0_30px_rgba(96,165,250,.25)]">
          <Avatar n={12} size={58} ring="ring-grape/70" />
          <div>
            <p className="font-bold">Tech Builders</p>
            <p className="text-sm text-white/60">12.4K members</p>
          </div>
        </div>
      </Float>

      {/* New message card */}
      <Float className="left-[34%] top-[265px]" delay={1.2}>
        <div className="glass flex w-[230px] items-center gap-4 rounded-2xl border-sky/40 p-4">
          <Avatar n={33} size={52} ring="ring-sky/60" />
          <div>
            <p className="text-sm font-semibold">New message</p>
            <p className="text-sm text-white/60">@Aarav</p>
          </div>
        </div>
      </Float>

      {/* scattered avatars */}
      <Float className="left-[6%] top-[130px]" delay={0.3}><Avatar n={5} size={56} /></Float>
      <Float className="right-0 top-[60px]" delay={0.9}><Avatar n={47} size={58} ring="ring-grape/70" /></Float>
      <Float className="right-[-6px] top-[300px]" delay={1.5}><Avatar n={20} size={52} ring="ring-amber-400/70" /></Float>
      <Float className="left-[-4px] top-[300px]" delay={0.2}><Avatar n={15} size={54} ring="ring-sky/70" /></Float>
      <Float className="left-[8%] top-[400px]" delay={0.8}><Avatar n={44} size={56} ring="ring-grape/70" /></Float>
      <Float className="left-[62%] top-[395px] flex -space-x-2" delay={1.1}>
        {[8, 32, 25, 3].map((n) => (
          <img key={n} src={av(n)} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-ink" />
        ))}
      </Float>
    </div>
  )
}