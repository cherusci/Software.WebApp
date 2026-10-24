import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={cn("mb-8 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-foreground/80"><span className="text-gold">●</span> {eyebrow}</p>}
      <h2 className="text-3xl font-bold text-primary-deep md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="border-b bg-primary-soft">
      <div className="container-rp py-14 md:py-20">
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-bold text-primary-deep md:text-5xl">{title}</h1>
        <div className="gold-rule mt-5" />
        {sub && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function FeatureCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card">
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-soft"><Icon className="h-5 w-5 text-primary" /></span>
      <h3 className="mb-1.5 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
      <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold-soft"><Icon className="h-5 w-5 text-gold-foreground" /></span>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon }: { label: string; value: string | number; hint?: string; icon: LucideIcon }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="mt-2 font-display text-3xl font-bold text-primary-deep">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="container-rp max-w-3xl space-y-5 py-12 text-foreground/85 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-deep [&_li]:ml-5 [&_li]:list-disc">{children}</div>;
}

export function PrototypeNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gold/50 bg-gold-soft p-4 text-sm text-gold-foreground">
      <strong>Prototype content.</strong> {children}
    </div>
  );
}
