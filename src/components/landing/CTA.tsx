import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isAuthenticated: boolean;
}

export function CTA({ isAuthenticated }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
      <div
        className="relative overflow-hidden rounded-3xl border border-primary/20 px-6 py-14 text-primary-foreground shadow-[var(--shadow-elegant)] md:px-12 md:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to retire the attendance ledger?
          </h2>
          <p className="mt-4 text-pretty text-primary-foreground/85">
            Set up your first site in minutes. Start free — no credit card required,
            no per-guard fees while you evaluate.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isAuthenticated ? (
              <Button
                asChild
                size="lg"
                className="h-12 bg-white px-6 text-base text-primary hover:bg-white/90"
              >
                <Link to="/dashboard">
                  Open dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-white px-6 text-base text-primary hover:bg-white/90"
                >
                  <Link to="/signup">
                    Create free account <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-white/0 px-6 text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link to="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
