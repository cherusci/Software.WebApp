import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  { title: "Renters", links: [["/rent", "Rent"], ["/for-tenants", "For Tenants"], ["/how-it-works", "How It Works"], ["/trust-safety", "Trust & Safety"]] },
  { title: "Property providers", links: [["/list-property", "List a Property"], ["/landlords", "For Landlords"], ["/agents", "For Agents"]] },
  { title: "Company", links: [["/about", "About"], ["/help", "Help Centre"], ["/contact", "Contact"], ["/mobile-app", "Mobile App · Coming Soon"]] },
  { title: "Legal", links: [["/terms", "Terms of Use"], ["/privacy", "Privacy Policy"], ["/cookies", "Cookie Policy"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-rp grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo onDark />
          <p className="max-w-xs text-sm text-primary-foreground/70">
            A Lagos rental marketplace helping renters find homes they can trust — and helping people authorised to let reach serious tenants.
          </p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Linkedin].map((I, i) => (
              <span key={i} title="Social account not yet available" aria-label="Social media unavailable" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold">
                <I className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-sm font-semibold text-gold">{c.title}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              {c.links.map(([to, l]) => (
                <li key={to}><Link to={to} className="hover:text-primary-foreground">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-rp flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© 2026 RentPaddy. Pre-launch preview · demo homes and journeys.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
