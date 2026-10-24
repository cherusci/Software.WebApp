import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Menu, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { actions, useStore } from "@/lib/store";
import { Logo } from "./Logo";

const NAV = [
  { to: "/rent", label: "Rent" },
  { to: "/list-property", label: "List a Property" },
  { to: "/landlords", label: "For Landlords" },
  { to: "/agents", label: "For Agents" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function dashboardPath(role: string) {
  return role === "tenant" ? "/dashboard/tenant" : role === "admin" ? "/dashboard/admin" : role === "agent" ? "/dashboard/agent" : "/dashboard/landlord";
}

export function SiteHeader() {
  const { session } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const signedIn = session.role !== "guest";

  const signOut = () => {
    actions.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-rp flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-accent hover:text-primary-deep" activeProps={{ className: "text-primary-deep bg-accent" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {signedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3 text-sm font-medium">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {session.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                  </span>
                  <span className="hidden max-w-[8rem] truncate sm:inline">{session.name.split(" ")[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="capitalize">{session.role} account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: dashboardPath(session.role) })}><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { actions.resetDemo(); navigate({ to: "/" }); }}><RotateCcw className="mr-2 h-4 w-4" />Reset demo data</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" asChild><Link to="/sign-in">Sign In</Link></Button>
              <Button asChild><Link to="/sign-up">Create Account</Link></Button>
            </div>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader><SheetTitle className="text-left"><Logo /></SheetTitle></SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent">{n.label}</Link>
                ))}
                <Link to="/trust-safety" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent">Trust & Safety</Link>
                <Link to="/help" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent">Help / FAQ</Link>
              </nav>
              {!signedIn && (
                <div className="mt-6 grid gap-2 px-4">
                  <Button asChild size="lg"><Link to="/sign-up" onClick={() => setOpen(false)}>Create Account</Link></Button>
                  <Button asChild size="lg" variant="outline"><Link to="/sign-in" onClick={() => setOpen(false)}>Sign In</Link></Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
