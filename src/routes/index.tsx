import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BadgeCheck, Building2, CalendarCheck, ClipboardList, Eye, FileCheck2, Handshake,
  Home, KeyRound, MessageSquareWarning, Receipt, Search, ShieldCheck, Play, UserCheck, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeroSearch } from "@/components/rp/HeroSearch";
import { PropertyCard } from "@/components/rp/PropertyCard";
import { FeatureCard, SectionHeading } from "@/components/rp/Common";
import { IMAGES, isPubliclyListed, isVerifiedProperty, LOCATIONS, PHOTO_POOL } from "@/lib/data";
import { IntroVideo } from "@/components/rp/IntroVideo";
import { MobileAppShowcase } from "@/components/rp/MobileApp";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RentPaddy — Find rental homes in Lagos you can trust" },
      { name: "description", content: "Search Lagos rentals with clear rent and fees, see what has been checked, and request viewings with people authorised to let." },
      { property: "og:title", content: "RentPaddy — Rental homes in Lagos you can trust" },
      { property: "og:description", content: "Clear rent and fees, transparent verification, and structured viewings for Lagos renters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home_,
});

export const FAQS = [
  ["Does a verified badge mean RentPaddy guarantees the property?", "No. A badge only shows which specific checks we have completed — for example, that the lister's identity was confirmed or that they provided evidence of authority to let. Always view the property in person and never pay before you are satisfied."],
  ["Do I pay anything to request a viewing?", "No. Requesting a viewing on RentPaddy is free. Be cautious of anyone asking for an 'inspection fee' transfer before you have seen a property, and report it to us."],
  ["Are agents allowed on RentPaddy?", "Yes. Legitimate agents and property managers are welcome. They must be authorised to let the properties they list, and must disclose their fees clearly."],
  ["Does submitting interest mean I've got the property?", "No. Expressing interest or applying lets the landlord or agent review you as a prospective tenant. It is not a tenancy agreement and does not guarantee you the property."],
  ["Which areas do you cover?", "We're starting with long-term residential rentals in Lagos — including Lekki, Ajah, Ikoyi, Victoria Island, Ikeja, Yaba, Surulere and Chevron."],
];

function Home_() {
  const { properties } = useStore();
  const live = properties.filter(isPubliclyListed);
  const featured = live.filter((p) => p.featured).slice(0, 3);
  const verified = live.filter(isVerifiedProperty).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={IMAGES.hero} alt="Apartment building in Lekki, Lagos" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-rp relative py-12 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-deep/40 px-3 py-1 text-xs font-semibold text-primary-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Starting in Lagos · Long-term residential rentals
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            Find a place you'll love<br className="hidden md:block"/> to <span className="text-gold">call home.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/85">
            Discover rental homes across Lagos, see the costs upfront and arrange viewings with greater confidence.
          </p>
          <Button variant="onDark" className="mt-5" onClick={()=>document.getElementById("meet-rentpaddy")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}><Play className="h-4 w-4"/>Watch How It Works</Button>
          <div className="mt-6 max-w-6xl"><HeroSearch /></div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-gold" /> Checks shown on every listing</span>
            <span className="flex items-center gap-1.5"><Receipt className="h-4 w-4 text-gold" /> All known fees upfront</span>
            <span className="flex items-center gap-1.5"><CalendarCheck className="h-4 w-4 text-gold" /> Free viewing requests</span>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-rp py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured · Demo homes" title="A few places to begin your search" />
          <Button variant="outline" asChild className="mb-8"><Link to="/rent">View all rentals <ArrowRight /></Link></Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      </section>

      {/* VERIFIED */}
      <section className="bg-primary-soft py-16 md:py-20">
        <div className="container-rp">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Trust in the details" title="Know what to check before you visit" sub="Explore sample verification states. These are demo homes, not properties checked by RentPaddy." />
            <Button variant="outline" asChild className="mb-8"><Link to="/rent" search={{ verified: true }}>Explore demo check states <ArrowRight /></Link></Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{verified.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <IntroVideo />

      {/* LOCATIONS */}
      <section className="container-rp py-16 md:py-20">
        <SectionHeading eyebrow="Popular locations" title="Explore Lagos neighbourhoods" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {LOCATIONS.map((l, i) => {
            const count = live.filter((p) => p.area === l).length;
            return (
              <Link key={l} to="/rent" search={{ area: l }} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={PHOTO_POOL[i % PHOTO_POOL.length]} alt={l} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="hero-overlay absolute inset-0" />
                <div className="absolute bottom-3 left-3 text-primary-foreground">
                  <div className="font-display text-lg font-semibold">{l}</div>
                  <div className="text-xs text-primary-foreground/80">{count} {count === 1 ? "home" : "homes"} available</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container-rp">
          <SectionHeading center eyebrow="Why RentPaddy?" title="Renting in Lagos shouldn't feel like a gamble" sub="Clear costs, useful details and fewer wasted trips across Lagos." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={UserCheck} title="Authorised to let" text="Listers show evidence they're allowed to market the property — owner, agent, manager or family representative." />
            <FeatureCard icon={Receipt} title="Fee transparency" text="Rent, agency, legal, caution and service charges listed upfront, with a total move-in estimate." />
            <FeatureCard icon={Eye} title="Availability matters" text="Published and available homes appear in search. Confirm the latest availability with the lister before travelling." />
            <FeatureCard icon={CalendarCheck} title="Structured viewings" text="Request a slot, get confirmed or rescheduled — no repeating your requirements to ten different agents." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-rp py-16 md:py-20">
        <SectionHeading center eyebrow="How RentPaddy works" title="From search to a confident decision" />
        <ol className="grid gap-5 md:grid-cols-5">
          {[
            [Search, "Search", "Filter by area, budget, bedrooms and features."],
            [FileCheck2, "Review", "See rent, fees and exactly what has been checked."],
            [CalendarCheck, "Book a viewing", "Pick a time; the lister confirms or proposes another."],
            [ClipboardList, "Express interest", "Share your details with the landlord or agent."],
            [Handshake, "Agree next steps", "Agreement and payment are handled with the provider."],
          ].map(([I, t, d], i) => {
            const Icon = I as typeof Search;
            return (
              <li key={t as string} className="relative rounded-2xl border bg-card p-5 shadow-card">
                <span className="absolute right-4 top-4 font-display text-3xl font-bold text-gold/40">0{i + 1}</span>
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">{t as string}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* TRUST */}
      <section className="bg-primary-deep py-16 text-primary-foreground md:py-20">
        <div className="container-rp grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">Trust & Verification</p>
            <h2 className="text-3xl font-bold md:text-4xl">A badge should tell a clear story.</h2>
            <p className="mt-4 text-primary-foreground/80">
              Instead of vague "verified owner" labels, every RentPaddy listing shows the status of each individual check. This demo illustrates check states; no real checks have been performed. Verification is never a guarantee of a person, property or transaction.
            </p>
            <Button variant="gold" asChild className="mt-6"><Link to="/trust-safety">How verification works <ArrowRight /></Link></Button>
          </div>
          <div className="space-y-3 rounded-2xl bg-card p-6 text-card-foreground">
            {[
              ["Identity", "A person's identity evidence would be reviewed privately.", "pending"],
              ["Authority to let", "Evidence that the lister can market this specific home.", "pending"],
              ["Listing details", "Photos, address, rent and fees reviewed against evidence.", "pending"],
              ["Availability", "Confirm with the lister before making a trip.", "pending"],
            ].map(([t, d, s]) => (
              <div key={t} className="flex items-start gap-3 rounded-xl border p-3">
                {s === "verified" ? <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> : <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning" />}
                <div className="min-w-0">
                  <div className="font-semibold">{t} {s !== "verified" && <span className="text-xs font-medium text-warning">· Check explained</span>}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="container-rp py-16 md:py-20">
        <SectionHeading center eyebrow="Built for everyone in the rental journey" title="One platform, three sides" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Home, t: "For Tenants", d: "Save homes, book viewings, track every request and application in one dashboard. Add optional verification to stand out.", to: "/for-tenants" as const, cta: "Start searching" },
            { icon: KeyRound, t: "For Landlords", d: "List your property once, receive structured viewing requests and review interested tenants — without endless calls.", to: "/for-landlords" as const, cta: "List your property" },
            { icon: Building2, t: "For Estate Agents", d: "Manage multiple listings, track performance and respond to viewings from a professional dashboard.", to: "/for-agents" as const, cta: "Join as an agent" },
          ].map(({ icon: I, t, d, to, cta }) => (
            <div key={t} className="flex flex-col rounded-2xl border bg-card p-7 shadow-card">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold-soft"><I className="h-6 w-6 text-gold-foreground" /></span>
              <h3 className="text-xl font-semibold text-primary-deep">{t}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{d}</p>
              <Link to={to} className="mt-5 inline-flex items-center gap-1 font-semibold text-primary hover:gap-2">{cta} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* LIST CTA */}
      <section className="container-rp pb-16 md:pb-20">
        <div className="grid overflow-hidden rounded-3xl bg-primary md:grid-cols-2">
          <div className="p-8 text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold">Have a property to let?</h2>
            <p className="mt-3 text-primary-foreground/85">Put the right details in front of prospective renters. Disclose your fees, submit for review and manage enquiries in one place.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold" size="lg" asChild><Link to="/list-a-property">List a Property</Link></Button>
              <Button variant="onDark" size="lg" asChild><Link to="/for-agents">I'm an agent</Link></Button>
            </div>
          </div>
          <img src={IMAGES.p2} alt="Terrace duplex in Chevron" loading="lazy" width={1024} height={768} className="h-64 w-full object-cover md:h-full" />
        </div>
      </section>

      <MobileAppShowcase />
      <section className="container-rp flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-20">
        <div className="max-w-2xl"><p className="mb-3 text-sm font-semibold text-primary">Help shape RentPaddy</p><h2 className="text-3xl font-bold text-primary-deep">Your Lagos renting story matters.</h2><p className="mt-4 text-muted-foreground">What made your last home search difficult? What would have made it easier? We're inviting renters, landlords and agents to share pilot feedback.</p><p className="mt-2 text-xs text-muted-foreground">Pilot-feedback invitation — not customer testimonials.</p></div>
        <Button variant="outline" asChild><Link to="/contact">Share pilot feedback <ArrowRight/></Link></Button>
      </section>

      {/* FAQ */}
      <section className="container-rp grid gap-10 py-16 md:grid-cols-[1fr_1.5fr] md:py-20">
        <SectionHeading eyebrow="FAQ" title="Questions renters ask" sub="Can't find an answer? Visit our Help Centre." />
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q ?? "faq"}>
              <AccordionTrigger className="text-left font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="border-t bg-gold-soft">
        <div className="container-rp flex flex-col items-center gap-5 py-14 text-center">
          <Users className="h-8 w-8 text-gold-foreground" />
          <h2 className="max-w-2xl text-3xl font-bold text-primary-deep md:text-4xl">Your next home in Lagos, with fewer surprises.</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild><Link to="/rent">Search Properties</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/auth" search={{ mode: "signup" }}>Create a free account</Link></Button>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MessageSquareWarning className="h-3.5 w-3.5" /> Never pay before viewing. Report suspicious requests to RentPaddy.</p>
        </div>
      </section>
    </>
  );
}
