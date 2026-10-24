import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)} aria-label="RentPaddy home">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M3 11.5 12 4l9 7.5" className="stroke-gold" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10v9h12v-9" className="stroke-primary-foreground" strokeWidth="2" strokeLinejoin="round" />
          <path d="m9.5 14.5 2 2 3.5-3.5" className="stroke-primary-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={cn("font-display text-xl font-bold tracking-tight", onDark ? "text-primary-foreground" : "text-primary-deep")}>
        Rent<span className="text-gold">Paddy</span>
      </span>
    </Link>
  );
}
