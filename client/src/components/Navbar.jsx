const links = ['Home', 'Communities', 'Features', 'Pricing']

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 text-xl font-bold">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="34" height="34" rx="10" fill="url(#lg)" />
        <path d="M22 11c-1-2-4-3-6-2s-3 3-1 5 6 2 7 5-2 5-5 5-5-1-6-3" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
      Sociocord
    </a>
  )
}

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-6">
      <Logo />
      <nav className="hidden gap-10 text-sm font-medium text-white/70 md:flex">
        {links.map((l, i) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className={`relative py-1 transition-colors hover:text-white ${i === 0 ? 'text-white' : ''}`}
          >
            {l}
            {i === 0 && <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-sky" />}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-5">
        <a href="#login" className="hidden text-sm font-medium text-white/80 hover:text-white sm:block">Login</a>
        <a href="#start" className="btn-grad rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:brightness-110">
          Get Started
        </a>
      </div>
    </header>
  )
}