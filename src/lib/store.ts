import { useSyncExternalStore } from "react";
import {
  seedApplications,
  seedNotifications,
  seedProperties,
  seedReports,
  seedTenants,
  seedViewings,
  providers as seedProviders,
  type Application,
  type ApplicationStatus,
  type ListingStatus,
  type Notification,
  type Property,
  type Provider,
  type Report,
  type Role,
  type Tenant,
  type Viewing,
  type ViewingStatus,
} from "./data";

export interface Session {
  role: Role;
  name: string;
  email: string;
  /** tenant id, provider id, or "admin" */
  actorId: string;
}

export interface State {
  session: Session;
  properties: Property[];
  providers: Provider[];
  tenants: Tenant[];
  viewings: Viewing[];
  applications: Application[];
  reports: Report[];
  notifications: Notification[];
  saved: string[];
}

const KEY = "rentpaddy-demo-v1";
const guest: Session = { role: "guest", name: "", email: "", actorId: "" };

export const DEMO_ACCOUNTS: Record<Exclude<Role, "guest">, Session> = {
  tenant: { role: "tenant", name: "Chiamaka Obi", email: "chiamaka.obi@example.com", actorId: "t1" },
  landlord: { role: "landlord", name: "Adaeze Okafor", email: "adaeze@example.com", actorId: "pr1" },
  agent: { role: "agent", name: "Tunde Bakare", email: "tunde@harbourline.ng", actorId: "pr2" },
  admin: { role: "admin", name: "RentPaddy Admin", email: "ops@rentpaddy.ng", actorId: "admin" },
};

function seed(): State {
  return {
    session: guest,
    properties: seedProperties,
    providers: seedProviders,
    tenants: seedTenants,
    viewings: seedViewings,
    applications: seedApplications,
    reports: seedReports,
    notifications: seedNotifications,
    saved: ["chevron-4bed-terrace", "vi-1bed-apartment"],
  };
}

const serverState = seed();
let state: State = serverState;
let loaded = false;
const listeners = new Set<() => void>();

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...seed(), ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt storage */
  }
}

function set(fn: (s: State) => Partial<State>) {
  ensureLoaded();
  state = { ...state, ...fn(state) };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useStore(): State {
  return useSyncExternalStore(
    (l) => {
      ensureLoaded();
      listeners.add(l);
      
      return () => listeners.delete(l);
    },
    () => state,
    () => serverState,
  );
}

const today = () => new Date().toISOString().slice(0, 10);
const uid = (p: string) => `${p}${Math.random().toString(36).slice(2, 8)}`;
const notify = (s: State, to: Role, text: string): Notification[] => [
  { id: uid("n"), to, text, createdAt: today() },
  ...s.notifications,
];


export function isActiveActor(s: State) {
  if (s.session.role === 'admin') return true;
  const actor = [...s.tenants, ...s.providers].find(a => a.id === s.session.actorId);
  return s.session.role !== 'guest' && !!actor && !actor.suspended;
}
export function canManageListing(s: State, p: Property) {
  return isActiveActor(s) && (s.session.role === 'admin' ||
    (['landlord', 'agent'].includes(s.session.role) && p.providerId === s.session.actorId));
}
const publicProperty = (s: State, id: string) => s.properties.find(p => p.id === id && p.status === 'published' && p.availability === 'available' && !s.providers.find(a => a.id === p.providerId)?.suspended);
const providerRole = (s: State, id: string): Role => s.providers.find(a => a.id === s.properties.find(p => p.id === id)?.providerId)?.role ?? 'landlord';
const canManageViewing = (s: State, id: string, status: ViewingStatus) => {
 const v = s.viewings.find(v => v.id === id);
 if (!v || !isActiveActor(s)) return false;
 if (s.session.role === 'tenant') return v.tenantId === s.session.actorId && status === 'cancelled';
 const p = s.properties.find(p => p.id === v.propertyId);
 return !!p && canManageListing(s, p);
};

export const actions = {
  createDemoProfile(session: Session, phone: string) {
    set(s => session.role === 'tenant' ? {tenants:[...s.tenants,{id:session.actorId,name:session.name,email:session.email,phone,emailVerified:false,phoneVerified:false,identity:'not_verified',income:'not_verified',preferredAreas:[],budgetMax:0}]} : {providers:[...s.providers,{id:session.actorId,name:session.name,role:session.role === 'agent' ? 'agent' : 'landlord',phoneVerified:false,identity:'not_verified',authority:'not_verified',responseTime:'New on RentPaddy',joined:today()}]});
  },
  updateProvider(id: string, patch: Partial<Provider>) { ensureLoaded(); if (!isActiveActor(state) || state.session.actorId !== id) return; set(s => ({providers:s.providers.map(p => p.id === id ? {...p,...patch} : p)})); },
  signIn(role: Exclude<Role, "guest">, overrides?: Partial<Session>) {
    set(() => ({ session: { ...DEMO_ACCOUNTS[role], ...overrides } }));
  },
  signOut() {
    set(() => ({ session: guest }));
  },
  resetDemo() {
    set(() => seed());
  },
  toggleSaved(id: string) {
    set((s) => ({ saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] }));
  },
  requestViewing(input: { propertyId: string; date: string; time: string; note?: string }) {
    ensureLoaded();
    if (!isActiveActor(state) || state.session.role !== "tenant" || !publicProperty(state, input.propertyId)) return "";
    const id = uid("v");
    set((s) => ({
      viewings: [
        { id, ...input, tenantId: s.session.actorId, status: "requested", createdAt: today() },
        ...s.viewings,
      ],
      notifications: notify(s, providerRole(s, input.propertyId), "New viewing request received."),
    }));
    return id;
  },
  setViewingStatus(id: string, status: ViewingStatus, extra?: Partial<Viewing>) {
    ensureLoaded(); if (!canManageViewing(state, id, status)) return;
    set((s) => ({
      viewings: s.viewings.map((v) => (v.id === id ? { ...v, proposedDate: extra?.proposedDate ?? v.proposedDate, proposedTime: extra?.proposedTime ?? v.proposedTime, status } : v)),
      notifications: notify(s, "tenant", `A viewing was updated: ${status.replace(/_/g, " ")}.`),
    }));
  },
  acceptProposedTime(id: string) {
    ensureLoaded(); const v = state.viewings.find(v => v.id === id); if (!isActiveActor(state) || state.session.role !== "tenant" || v?.tenantId !== state.session.actorId || v.status !== "reschedule_proposed") return;
    set((s) => ({
      viewings: s.viewings.map((v) =>
        v.id === id && v.proposedDate
          ? { ...v, date: v.proposedDate, time: v.proposedTime ?? v.time, status: "confirmed" as const, proposedDate: undefined, proposedTime: undefined }
          : v,
      ),
    }));
  },
  submitApplication(input: { propertyId: string; moveIn: string; occupants: number; message: string }) {
    ensureLoaded(); if (!isActiveActor(state) || state.session.role !== "tenant" || !publicProperty(state, input.propertyId) || !state.viewings.some(v => v.propertyId === input.propertyId && v.tenantId === state.session.actorId && v.status === "completed")) return;
    set((s) => ({
      applications: [
        { id: uid("a"), ...input, tenantId: s.session.actorId, status: "submitted", updatedAt: today() },
        ...s.applications,
      ],
      notifications: notify(s, providerRole(s, input.propertyId), "A tenant expressed interest in one of your properties."),
    }));
  },
  setApplicationStatus(id: string, status: ApplicationStatus) {
    ensureLoaded(); const a = state.applications.find(a => a.id === id); const p = state.properties.find(p => p.id === a?.propertyId);
    if (!a || !p || !isActiveActor(state) || (state.session.role === 'tenant' ? a.tenantId !== state.session.actorId || status !== 'withdrawn' : !canManageListing(state, p))) return;
    set((s) => ({
      applications: s.applications.map((a) => (a.id === id ? { ...a, status, updatedAt: today() } : a)),
      notifications: notify(s, "tenant", `Your application status changed to ${status.replace(/_/g, " ")}.`),
    }));
  },
  upsertProperty(p: Property) {
    ensureLoaded(); const old = state.properties.find(x => x.id === p.id);
    if (!isActiveActor(state) || !['landlord','agent'].includes(state.session.role) || p.providerId !== state.session.actorId || (old && old.providerId !== state.session.actorId) || !['draft','pending_review'].includes(p.status)) return;
    p = {...p, checks: old ? {...old.checks, listing: p.checks.listing} : {identity:'not_verified',authority:'not_verified',listing:p.status === 'pending_review' ? 'review_required' : 'not_verified'}};
    set((s) => {
      const exists = s.properties.some((x) => x.id === p.id);
      return {
        properties: exists ? s.properties.map((x) => (x.id === p.id ? p : x)) : [p, ...s.properties],
        notifications:
          p.status === "pending_review" ? notify(s, "admin", `New listing submitted: ${p.title}, ${p.area}.`) : s.notifications,
      };
    });
  },
  setListingStatus(id: string, status: ListingStatus, adminNote?: string) {
    ensureLoaded(); const p = state.properties.find(p => p.id === id);
    if (!p || !canManageListing(state, p) || (state.session.role !== 'admin' && !['pending_review','paused','let','archived'].includes(status))) return;
    set((s) => ({
      properties: s.properties.map((p) => {
        if (p.id !== id) return p;
        const next: Property = { ...p, status, adminNote: adminNote ?? p.adminNote };
        if (status === "let") next.availability = "let";
        if (status === "published") {
          next.availability = "available";
          next.checks = { ...p.checks, listing: p.checks.listing === "review_required" ? "pending" : p.checks.listing };
        }
        return next;
      }),
      notifications: notify(s, providerRole(s, id), `Listing status changed to ${status.replace(/_/g, " ")}.`),
    }));
  },
  approveListing(id: string, checks: Property["checks"]) {
    ensureLoaded(); if (state.session.role !== "admin") return;
    set((s) => ({
      properties: s.properties.map((p) =>
        p.id === id ? { ...p, status: "published", availability: "available", checks: { ...checks, lastConfirmed: today() }, adminNote: undefined } : p,
      ),
      notifications: notify(s, providerRole(s, id), "Your listing has been approved and is now live."),
    }));
  },
  reportListing(input: { propertyId: string; reason: string; details: string }) {
    set((s) => ({
      reports: [{ id: uid("r"), ...input, status: "open", createdAt: today() }, ...s.reports],
      notifications: notify(s, "admin", "A listing was reported by a user."),
    }));
  },
  setReportStatus(id: string, status: Report["status"]) {
    ensureLoaded(); if (state.session.role !== "admin") return;
    set((s) => ({ reports: s.reports.map((r) => (r.id === id ? { ...r, status } : r)) }));
  },
  setProviderSuspended(id: string, suspended: boolean) {
    ensureLoaded(); if (state.session.role !== "admin") return;
    set((s) => ({
      providers: s.providers.map((p) => (p.id === id ? { ...p, suspended } : p)),
      properties: suspended
        ? s.properties.map((p) => (p.providerId === id && p.status === "published" ? { ...p, status: "paused" } : p))
        : s.properties,
    }));
  },
  setTenantSuspended(id: string, suspended: boolean) {
    ensureLoaded(); if (state.session.role !== "admin") return;
    set((s) => ({ tenants: s.tenants.map((t) => (t.id === id ? { ...t, suspended } : t)) }));
  },
  updateTenant(id: string, patch: Partial<Tenant>) {
    ensureLoaded(); if (!isActiveActor(state) || state.session.actorId !== id) return;
    set((s) => ({ tenants: s.tenants.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  },
  markNotificationsRead(role: Role) {
    set((s) => ({ notifications: s.notifications.map((n) => (n.to === role ? { ...n, read: true } : n)) }));
  },
};

export const newId = uid;
