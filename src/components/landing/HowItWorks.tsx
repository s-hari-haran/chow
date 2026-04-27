import { UserPlus, ScanLine, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Onboard guards & sites",
    desc: "Admin creates guard profiles, sets the base salary, and assigns each guard to a site with a unique QR code.",
  },
  {
    icon: ScanLine,
    title: "Guards scan to check in",
    desc: "Each morning, guards open GuardCheck on their phone and scan the site QR to instantly mark attendance.",
  },
  {
    icon: BarChart3,
    title: "Track salary in real time",
    desc: "Attendance flows into a live monthly view and salary calculation — no spreadsheets, no end-of-month rush.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            From setup to payday in three simple steps
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="relative rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-5xl font-bold tracking-tight text-primary/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>

              {i < steps.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute right-[-22px] top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/40 md:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
