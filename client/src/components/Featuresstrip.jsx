import { MessageCircle, Sparkles, Rocket, Users, LayoutGrid } from 'lucide-react'

const features = [
  { icon: MessageCircle, title: 'Real-time Chat', text: 'Text, Voice & Video' },
  { icon: Sparkles, title: 'AI Assistant', text: 'Summarize, Search, Suggest' },
  { icon: Rocket, title: 'Sociocord Nitro', text: 'Premium Features' },
  { icon: Users, title: 'Custom Communities', text: 'For every interest' },
  { icon: LayoutGrid, title: 'Cross-Platform', text: 'Web & Mobile' },
]

export default function FeaturesStrip() {
  return (
    <section id="features" className="pt-8 pb-16">
      <h2 className="mb-5 text-xl font-semibold text-white/90">Everything you need in one place</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-sky/40">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet/25 text-indigo-300">
              <Icon size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-white/55">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}