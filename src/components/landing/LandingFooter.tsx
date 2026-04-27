import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">GuardCheck</p>
              <p className="text-xs text-muted-foreground">
                Secure QR attendance for security guards
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <Link to="/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              Get started
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-left">
          © {new Date().getFullYear()} GuardCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
