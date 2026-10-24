import { BadgeCheck, Clock, AlertTriangle, XCircle, CircleDashed, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApplicationStatus, ListingStatus, VerificationStatus, ViewingStatus } from "@/lib/data";

type Tone = "green" | "gold" | "gray" | "red" | "blue" | "amber";
const tones: Record<Tone, string> = {
  green: "bg-primary-soft text-primary-deep border-primary/20",
  gold: "bg-gold-soft text-gold-foreground border-gold/40",
  gray: "bg-muted text-muted-foreground border-border",
  red: "bg-danger-soft text-destructive border-destructive/20",
  blue: "bg-info-soft text-info border-info/20",
  amber: "bg-warning-soft text-warning border-warning/30",
};

export function Pill({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  verified: "Verified",
  pending: "Verification Pending",
  not_verified: "Not Verified",
  unable: "Unable to Verify",
  review_required: "Review Required",
};

export function VerificationBadge({ status, label }: { status: VerificationStatus; label?: string }) {
  const map: Record<VerificationStatus, [Tone, React.ReactNode]> = {
    verified: ["green", <BadgeCheck key="i" className="h-3.5 w-3.5" />],
    pending: ["amber", <Clock key="i" className="h-3.5 w-3.5" />],
    not_verified: ["gray", <CircleDashed key="i" className="h-3.5 w-3.5" />],
    unable: ["red", <XCircle key="i" className="h-3.5 w-3.5" />],
    review_required: ["blue", <AlertTriangle key="i" className="h-3.5 w-3.5" />],
  };
  const [tone, icon] = map[status];
  return (
    <Pill tone={tone}>
      {icon}
      {label ? `${label}: ${(status === "verified" ? "Verified (demo)" : VERIFICATION_LABEL[status])}` : (status === "verified" ? "Verified (demo)" : VERIFICATION_LABEL[status])}
    </Pill>
  );
}

export function VerifiedPropertyBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-primary-deep px-2.5 py-1 text-xs font-semibold text-primary-foreground", className)}>
      <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Verified Property (demo)
    </span>
  );
}

const LISTING: Record<ListingStatus, [Tone, string]> = {
  draft: ["gray", "Draft"],
  pending_review: ["amber", "Pending Review"],
  changes_required: ["blue", "Changes Required"],
  published: ["green", "Published"],
  paused: ["gray", "Paused"],
  let: ["gold", "Let / Unavailable"],
  rejected: ["red", "Rejected"],
  archived: ["gray", "Archived"],
};
export const ListingBadge = ({ status }: { status: ListingStatus }) => <Pill tone={LISTING[status][0]}>{LISTING[status][1]}</Pill>;

const VIEWING: Record<ViewingStatus, [Tone, string]> = {
  requested: ["amber", "Requested"],
  confirmed: ["green", "Confirmed"],
  reschedule_proposed: ["blue", "Reschedule Proposed"],
  cancelled: ["red", "Cancelled"],
  completed: ["gold", "Completed"],
  no_show: ["gray", "No-show"],
};
export const ViewingBadge = ({ status }: { status: ViewingStatus }) => <Pill tone={VIEWING[status][0]}>{VIEWING[status][1]}</Pill>;

const APP: Record<ApplicationStatus, [Tone, string]> = {
  submitted: ["amber", "Submitted"],
  under_review: ["blue", "Under Review"],
  more_info: ["gold", "More Information Requested"],
  progressed: ["green", "Progressed"],
  declined: ["red", "Declined"],
  withdrawn: ["gray", "Withdrawn"],
  closed: ["gray", "Closed"],
};
export const ApplicationBadge = ({ status }: { status: ApplicationStatus }) => <Pill tone={APP[status][0]}>{APP[status][1]}</Pill>;
