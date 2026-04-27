import { CheckCircle2, TrendingUp, Clock, Lock } from "lucide-react";

const points = [
  {
    title: "Eliminate buddy punching",
    desc: "Site-bound QR codes mean attendance can only be marked when the guard is physically there.",
  },
  {
    title: "Cut payroll errors to zero",
    desc: "Attendance and salary live in the same system, so you stop reconciling sheets every month.",
  },
  {
    title: "Made for guards, not desks",
    desc: "Designed mobile-first with large tap targets and a one-handed flow that works on any phone.",
  },
  {
    title: "Secure & role-based",
    desc: "Supabase auth, row-level security, and admin-only controls keep guard data safe by default.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why GuardCheck
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            The fastest way to run accurate guard attendance
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Replace ledgers, photos, and chat-group check-ins with a single source of
            truth that everyone — guards, supervisors, and accountants — can rely on.
          </p>

          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard
            icon={TrendingUp}
            metric="3.5×"
            label="Faster month-end payroll"
            tone="primary"
          />
          <MetricCard
            icon={Clock}
            metric="< 1s"
            label="Average scan-to-confirm"
            tone="muted"
          />
          <MetricCard
            icon={Lock}
            metric="100%"
            label="Audit-ready records"
            tone="muted"
          />
          <MetricCard
            icon={CheckCircle2}
            metric="0"
            label="Spreadsheets to maintain"
            tone="primary"
          />
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  metric,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
  label: string;
  tone: "primary" | "muted";
}) {
  const isPrimary = tone === "primary";
  return (
    <div
      className={`rounded-2xl border p-5 ${
        isPrimary
          ? "border-primary/20 bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
          : "border-border bg-card"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          isPrimary ? "bg-white/15" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p
        className={`mt-5 text-3xl font-bold tracking-tight ${
          isPrimary ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {metric}
      </p>
      <p
        className={`mt-1 text-sm ${
          isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
