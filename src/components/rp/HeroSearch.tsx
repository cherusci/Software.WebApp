import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/data";

export const BUDGETS = [500000, 1000000, 1500000, 2000000, 3000000, 5000000, 8000000, 12000000, 20000000];
const fmt = (n: number) => (n >= 1e6 ? `₦${n / 1e6}m` : `₦${n / 1e3}k`);

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function HeroSearch() {
  const navigate = useNavigate();
  const [area, setArea] = useState("any");
  const [type, setType] = useState("any");
  const [min, setMin] = useState("any");
  const [max, setMax] = useState("any");
  const [beds, setBeds] = useState("any");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/rent",
      search: {
        area: area === "any" ? undefined : area,
        type: type === "any" ? undefined : type,
        min: min === "any" ? undefined : Number(min),
        max: max === "any" ? undefined : Number(max),
        beds: beds === "any" ? undefined : Number(beds),
      },
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-card p-4 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_1fr_0.8fr_auto] lg:items-end">
      <Field label="Location">
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Anywhere in Lagos</SelectItem>
            {LOCATIONS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Property type">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All types</SelectItem>
            {PROPERTY_TYPES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Min budget / yr">
        <Select value={min} onValueChange={setMin}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">No min</SelectItem>
            {BUDGETS.map((b) => <SelectItem key={b} value={String(b)}>{fmt(b)}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Max budget / yr">
        <Select value={max} onValueChange={setMax}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">No max</SelectItem>
            {BUDGETS.map((b) => <SelectItem key={b} value={String(b)}>{fmt(b)}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Bedrooms">
        <Select value={beds} onValueChange={setBeds}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {[1, 2, 3, 4, 5].map((b) => <SelectItem key={b} value={String(b)}>{b}+</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Button type="submit" variant="gold" size="lg" className="sm:col-span-2 lg:col-span-1">
        <Search /> Search Properties
      </Button>
    </form>
  );
}
