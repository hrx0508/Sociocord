import { Play } from 'lucide-react'
import HeroVisual from './HeroVisual'

export default function Hero() {
  return (
    <section id="home" className="grid items-center gap-10 pt-6 pb-12 lg:grid-cols-2">
      <div>
        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
          Find your <span className="text-grad-blue">people.</span>
          <br />
          Build your <span className="text-grad-purple">world.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
          Sociocord is where communities, conversations and opportunities come together — powered by AI,
          with features that go beyond just chat.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#start" className="btn-grad rounded-2xl px-8 py-4 font-semibold transition hover:brightness-110">
            Get Started Free
          </a>
          <a
            href="#demo"
            className="glass flex items-center gap-3 rounded-2xl border-violet/60 px-7 py-4 font-semibold transition hover:bg-white/10"
          >
            <Play size={18} className="text-emerald-400" /> Watch Demo
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  )
}