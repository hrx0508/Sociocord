import { Users, MessagesSquare, MessageCircle, ShieldCheck } from 'lucide-react'

const stats = [
  { icon: Users, value: '500K+', label: 'Active Users', tone: 'text-sky' },
  { icon: MessagesSquare, value: '8K+', label: 'Communities', tone: 'text-grape' },
  { icon: MessageCircle, value: '1.2M+', label: 'Messages/Day', tone: 'text-violet' },
  { icon: ShieldCheck, value: '99.9%', label: 'Uptime', tone: 'text-indigo-400' },
]

export default function StatsRow() {
  return (
    <section className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label, tone }) => (
        <div key={label} className="glass flex items-center gap-4 rounded-2xl px-5 py-5">
          <Icon size={30} className={tone} />
          <div>
            <p className="text-2xl font-bold leading-none">{value}</p>
            <p className="mt-1 text-sm text-white/55">{label}</p>
          </div>
        </div>
      ))}
    </section>
  )
}