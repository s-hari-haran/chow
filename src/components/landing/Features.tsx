import {
  QrCode,
  CalendarCheck,
  Wallet,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Single-scan check-in",
    desc: "Guards mark attendance in under a second by scanning the unique site QR — no paperwork, no manual entry.",
  },
  {
    icon: Wallet,
    title: "Real-time salary",
    desc: "Daily salary calculation updates automatically as guards mark attendance. View earnings and deductions live.",
  },
  {
    icon: CalendarCheck,
    title: "Monthly attendance",
    desc: "A clear calendar view of present, absent, and pending days for each guard with one-tap exports.",
  },
  {
    icon: MapPin,
    title: "Site assignment",
    desc: "Assign guards to specific sites with location-aware QR codes so check-ins are always verified at the right place.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp alerts",
    desc: "Automatic notifications keep supervisors informed when shifts start, end, or guards miss check-in windows.",
  },
  {
    icon: ShieldCheck,
    title: "Admin control center",
    desc: "Manage guards, sites, attendance overrides, and payroll from a secure admin dashboard built for ops teams.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Features
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Everything you need to run a tight security operation
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          From the first scan in the morning to month-end payroll, GuardCheck handles
          the entire attendance and salary workflow.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
