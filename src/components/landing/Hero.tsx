import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  MapPin,
  ShieldCheck,
  Wallet,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isAuthenticated: boolean;
}

export function Hero({ isAuthenticated }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.95 0.04 252 / 0.7) 0%, transparent 70%), linear-gradient(180deg, var(--background), var(--background))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-10 md:px-6 md:py-24 lg:py-28">
        <div className="flex flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-card)]">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for modern security teams
          </div>

          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            QR attendance &{" "}
            <span className="text-primary">salary tracking</span> for security guards.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            GuardCheck lets your guards mark daily duty with a single QR scan, and
            gives admins a real-time view of attendance, sites, and payroll — all
            from one mobile-first dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {isAuthenticated ? (
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/dashboard">
                  Open dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="h-12 px-6 text-base">
                  <Link to="/signup">
                    Get started free <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </>
            )}
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-y-2.5 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              "QR-based check-in",
              "Real-time payroll",
              "Site assignment",
              "WhatsApp alerts",
              "Monthly reports",
              "Admin controls",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-none">
      {/* Phone frame */}
      <div
        className="relative mx-auto aspect-[9/19] w-[280px] rounded-[2.75rem] border-[10px] border-foreground/90 bg-foreground/90 shadow-[0_30px_60px_-20px_oklch(0.18_0.04_260_/_0.45)] md:w-[320px]"
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground" />

        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.1rem]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="flex h-full flex-col px-4 pb-4 pt-8 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold tracking-tight">GuardCheck</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_4px_oklch(0.62_0.17_145_/_0.3)]" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-wider text-primary-foreground/70">
              Today&apos;s status
            </p>
            <p className="mt-1 flex items-center gap-2 text-2xl font-bold">
              <CheckCircle2 className="h-6 w-6" />
              Present
            </p>
            <p className="mt-1 text-xs text-primary-foreground/80">Marked at 8:02 AM</p>

            <div className="mt-5 rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70">
                    Assigned site
                  </p>
                  <p className="truncate text-sm font-semibold">Cyber Tower B</p>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <Wallet className="h-4 w-4" />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-primary-foreground/70">
                  This month
                </p>
                <p className="mt-0.5 text-base font-bold">₹14,400</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <QrCode className="h-4 w-4" />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-primary-foreground/70">
                  Days present
                </p>
                <p className="mt-0.5 text-base font-bold">24 / 30</p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-around rounded-2xl bg-white/10 px-2 py-2 backdrop-blur">
              {[QrCode, ShieldCheck, Wallet].map((Icon, i) => (
                <div
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    i === 0 ? "bg-white text-primary" : "text-primary-foreground/70"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating QR card */}
      <div className="absolute -left-2 top-16 hidden w-44 rotate-[-6deg] rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-elegant)] sm:block md:-left-6 md:top-24">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <QrCode className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold">Scan to check-in</p>
        </div>
        <div className="mt-2.5 grid grid-cols-7 gap-0.5">
          {Array.from({ length: 49 }).map((_, i) => {
            const filled = [
              0, 1, 2, 5, 6, 7, 9, 12, 14, 16, 17, 19, 22, 23, 25, 28, 30, 31, 32, 36, 38, 40, 42,
              43, 44, 47, 48,
            ].includes(i);
            return (
              <div
                key={i}
                className={`aspect-square rounded-[2px] ${filled ? "bg-foreground" : "bg-transparent"}`}
              />
            );
          })}
        </div>
      </div>

      {/* Floating success toast */}
      <div className="absolute -right-2 bottom-8 hidden w-56 rotate-[5deg] rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-elegant)] sm:block md:-right-6 md:bottom-16">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Attendance marked</p>
            <p className="text-xs text-muted-foreground">Cyber Tower B • 8:02 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
