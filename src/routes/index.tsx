import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GuardCheck — Secure QR Attendance for Security Guards" },
      {
        name: "description",
        content:
          "GuardCheck is a mobile-first QR attendance and salary tracking platform built for security guards and ops teams. Mark daily duty in one scan, track real-time payroll, and run audits effortlessly.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader isAuthenticated={isAuthenticated} />
      <main>
        <Hero isAuthenticated={isAuthenticated} />
        <Stats />
        <Features />
        <HowItWorks />
        <WhyChoose />
        <FAQ />
        <CTA isAuthenticated={isAuthenticated} />
      </main>
      <LandingFooter />
    </div>
  );
}
