import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { isVerifiedProperty, totalMoveInCost, type Property } from "@/lib/data";
import { naira, niceDate } from "@/lib/format";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function SaveButton({ id, className }: { id: string; className?: string }) {
  const { saved } = useStore();
  const on = saved.includes(id);
  return (
    <Button variant="ghost" size="icon"
      type="button"
      aria-label={on ? "Remove from saved" : "Save property"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        actions.toggleSaved(id);
        toast.success(on ? "Removed from saved properties" : "Saved to your shortlist");
      }}
      className={cn("grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow-card transition hover:scale-105", className)}
    >
      <Heart className={cn("h-4 w-4", on ? "fill-gold text-gold" : "text-primary-deep")} />
    </Button>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  const {providers} = useStore();
  const provider = providers.find(x=>x.id===p.providerId);
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={`${p.title} in ${p.area}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-card/95 px-2 py-1 text-xs font-semibold text-primary-deep">Demo home</span>
        </div>
        <SaveButton id={p.id} className="absolute right-3 top-3" />
        <span className="absolute bottom-3 left-3 rounded-md bg-card/95 px-2 py-0.5 text-xs font-semibold text-primary-deep">{p.type}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-xl font-bold text-primary-deep">{naira(p.rent)}</span>
          <span className="text-sm text-muted-foreground">/ year</span>
        </div>
        <p className="text-xs text-muted-foreground">Known move-in costs: {naira(totalMoveInCost(p))}</p>
        <h3 className="truncate text-base font-semibold">{p.title}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" /> <span className="truncate">{p.area}, Lagos</span>
        </p>
        <p className="text-xs text-muted-foreground">{provider?.business||provider?.name} · {p.availability==='available'?'Available':'Unavailable'}</p>
        <p className="text-xs text-muted-foreground">Demo check state: {isVerifiedProperty(p)?'all checks complete':p.checks.listing.replaceAll('_',' ')}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{p.beds} bed</span>
            <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{p.baths} bath</span>
          </span>
          <span className="text-xs font-medium text-primary">From {niceDate(p.availableFrom).replace(/^\w+, /, "")}</span>
        </div>
      </div>
    </Link>
  );
}
