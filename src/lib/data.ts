import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";

export const IMAGES = { hero, p1, p2, p3, p4, p5 };
export const PHOTO_POOL = [hero, p1, p2, p3, p4, p5];

export const LOCATIONS = [
  "Lekki Phase 1",
  "Ajah",
  "Ikoyi",
  "Victoria Island",
  "Ikeja GRA",
  "Yaba",
  "Surulere",
  "Chevron",
] as const;

export const PROPERTY_TYPES = [
  "Apartment",
  "Flat",
  "Mini Flat",
  "Self Contain",
  "Terrace",
  "Semi-detached Duplex",
  "Detached Duplex",
] as const;

export const AMENITIES = [
  "24/7 Security",
  "Prepaid Meter",
  "Borehole Water",
  "Backup Generator",
  "Fitted Kitchen",
  "Wardrobes",
  "Air Conditioning",
  "Parking Space",
  "POP Ceiling",
  "Gated Estate",
  "Swimming Pool",
  "Gym",
  "Serviced",
  "Boys' Quarters",
] as const;

export type ListingStatus =
  | "draft"
  | "pending_review"
  | "changes_required"
  | "published"
  | "paused"
  | "let"
  | "rejected"
  | "archived";

export type VerificationStatus =
  | "verified"
  | "pending"
  | "not_verified"
  | "unable"
  | "review_required";

export type ViewingStatus =
  | "requested"
  | "confirmed"
  | "reschedule_proposed"
  | "cancelled"
  | "completed"
  | "no_show";

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "more_info"
  | "progressed"
  | "declined"
  | "withdrawn"
  | "closed";

export type Role = "guest" | "tenant" | "landlord" | "agent" | "admin";

export interface Fee {
  label: string;
  amount: number;
}

export interface Property {
  id: string;
  title: string;
  type: string;
  area: string;
  street: string;
  rent: number;
  period: "year";
  fees: Fee[];
  beds: number;
  baths: number;
  toilets: number;
  description: string;
  amenities: string[];
  images: string[];
  status: ListingStatus;
  availability: "available" | "let";
  availableFrom: string;
  providerId: string;
  checks: {
    identity: VerificationStatus;
    authority: VerificationStatus;
    listing: VerificationStatus;
    lastConfirmed?: string;
  };
  featured?: boolean;
  views: number;
  createdAt: string;
  adminNote?: string | undefined;
}

export interface Provider {
  id: string;
  name: string;
  role: "landlord" | "agent";
  business?: string;
  phoneVerified: boolean;
  identity: VerificationStatus;
  authority: VerificationStatus;
  responseTime: string;
  joined: string;
  suspended?: boolean;
}

export interface Viewing {
  id: string;
  propertyId: string;
  tenantId: string;
  date: string;
  time: string;
  status: ViewingStatus;
  note?: string;
  proposedDate?: string | undefined;
  proposedTime?: string | undefined;
  createdAt: string;
}

export interface Application {
  id: string;
  propertyId: string;
  tenantId: string;
  status: ApplicationStatus;
  moveIn: string;
  occupants: number;
  message: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  propertyId: string;
  reason: string;
  details: string;
  status: "open" | "investigating" | "resolved";
  createdAt: string;
}

export interface Notification {
  id: string;
  to: Role;
  text: string;
  createdAt: string;
  read?: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  identity: VerificationStatus;
  income: VerificationStatus;
  preferredAreas: string[];
  budgetMax: number;
  suspended?: boolean;
}

export const providers: Provider[] = [
  { id: "pr1", name: "Adaeze Okafor", role: "landlord", phoneVerified: true, identity: "verified", authority: "verified", responseTime: "Usually responds within 3 hours", joined: "2026-03-02" },
  { id: "pr2", name: "Tunde Bakare", role: "agent", business: "Harbourline Realty Ltd", phoneVerified: true, identity: "verified", authority: "verified", responseTime: "Usually responds within 1 hour", joined: "2026-02-11" },
  { id: "pr3", name: "Ngozi Eze", role: "agent", business: "Eze & Partners Property Managers", phoneVerified: true, identity: "verified", authority: "pending", responseTime: "Usually responds same day", joined: "2026-05-20" },
  { id: "pr4", name: "Kunle Adeyemi", role: "landlord", phoneVerified: true, identity: "pending", authority: "not_verified", responseTime: "New on RentPaddy", joined: "2026-09-28" },
];

const im = (...i: number[]) => i.flatMap((n) => PHOTO_POOL[n] ? [PHOTO_POOL[n]] : []);

export const seedProperties: Property[] = [
  {
    id: "lekki-3bed-apartment",
    title: "3 Bedroom Apartment",
    type: "Apartment",
    area: "Lekki Phase 1",
    street: "Off Admiralty Way",
    rent: 4500000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 450000 },
      { label: "Legal / agreement fee (10%)", amount: 450000 },
      { label: "Caution deposit (refundable)", amount: 300000 },
      { label: "Service charge (annual)", amount: 600000 },
    ],
    beds: 3, baths: 3, toilets: 4,
    description:
      "Bright, well-finished 3 bedroom apartment in a quiet close off Admiralty Way. All rooms en-suite, with a guest toilet, fitted kitchen and a balcony overlooking the estate garden. Building has six units, a resident facility manager and dedicated parking for two cars.",
    amenities: ["24/7 Security", "Prepaid Meter", "Borehole Water", "Backup Generator", "Fitted Kitchen", "Wardrobes", "Air Conditioning", "Parking Space", "POP Ceiling"],
    images: im(1, 0, 3, 4),
    status: "published", availability: "available", availableFrom: "2026-11-01",
    providerId: "pr2",
    checks: { identity: "verified", authority: "verified", listing: "verified", lastConfirmed: "2026-10-12" },
    featured: true, views: 1284, createdAt: "2026-09-14",
  },
  {
    id: "yaba-2bed-flat",
    title: "2 Bedroom Flat",
    type: "Flat",
    area: "Yaba",
    street: "Alagomeji, near Unilag Road",
    rent: 2500000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 250000 },
      { label: "Legal / agreement fee (10%)", amount: 250000 },
      { label: "Caution deposit (refundable)", amount: 150000 },
    ],
    beds: 2, baths: 2, toilets: 3,
    description:
      "Spacious 2 bedroom flat on the second floor of a block of six flats. Tiled throughout, with a prepaid meter, borehole water and a shared compound. Five minutes from Yaba tech hub and close to BRT.",
    amenities: ["Prepaid Meter", "Borehole Water", "Wardrobes", "Parking Space", "POP Ceiling"],
    images: im(5, 3, 4, 1),
    status: "published", availability: "available", availableFrom: "2026-10-25",
    providerId: "pr1",
    checks: { identity: "verified", authority: "verified", listing: "pending", lastConfirmed: "2026-10-05" },
    featured: true, views: 932, createdAt: "2026-09-30",
  },
  {
    id: "chevron-4bed-terrace",
    title: "4 Bedroom Terrace",
    type: "Terrace",
    area: "Chevron",
    street: "Chevron Drive, gated estate",
    rent: 6500000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 650000 },
      { label: "Legal / agreement fee (10%)", amount: 650000 },
      { label: "Caution deposit (refundable)", amount: 500000 },
      { label: "Estate service charge (annual)", amount: 850000 },
    ],
    beds: 4, baths: 4, toilets: 5,
    description:
      "Newly built 4 bedroom terrace duplex with boys' quarters in a secure gated estate along Chevron Drive. Interlocked compound, fitted kitchen with store, family lounge upstairs and a private balcony.",
    amenities: ["24/7 Security", "Gated Estate", "Prepaid Meter", "Borehole Water", "Fitted Kitchen", "Boys' Quarters", "Parking Space", "POP Ceiling"],
    images: im(2, 1, 3, 4),
    status: "published", availability: "available", availableFrom: "2026-11-15",
    providerId: "pr2",
    checks: { identity: "verified", authority: "verified", listing: "verified", lastConfirmed: "2026-10-10" },
    featured: true, views: 2210, createdAt: "2026-08-22",
  },
  {
    id: "ikoyi-3bed-serviced",
    title: "3 Bedroom Serviced Apartment",
    type: "Apartment",
    area: "Ikoyi",
    street: "Bourdillon Road",
    rent: 18000000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 1800000 },
      { label: "Legal / agreement fee (5%)", amount: 900000 },
      { label: "Caution deposit (refundable)", amount: 1500000 },
      { label: "Service charge (annual)", amount: 4500000 },
    ],
    beds: 3, baths: 3, toilets: 4,
    description:
      "Fully serviced 3 bedroom apartment with 24-hour power, swimming pool and gym. Lift access, two parking bays and a dedicated concierge.",
    amenities: ["24/7 Security", "Serviced", "Swimming Pool", "Gym", "Backup Generator", "Air Conditioning", "Fitted Kitchen", "Parking Space"],
    images: im(4, 1, 3, 0),
    status: "published", availability: "available", availableFrom: "2026-12-01",
    providerId: "pr3",
    checks: { identity: "verified", authority: "pending", listing: "pending" },
    views: 640, createdAt: "2026-10-01",
  },
  {
    id: "ajah-2bed-flat",
    title: "2 Bedroom Flat",
    type: "Flat",
    area: "Ajah",
    street: "Thomas Estate, Abraham Adesanya",
    rent: 1800000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 180000 },
      { label: "Legal / agreement fee (10%)", amount: 180000 },
      { label: "Caution deposit (refundable)", amount: 100000 },
    ],
    beds: 2, baths: 2, toilets: 3,
    description: "Clean 2 bedroom flat in Thomas Estate with prepaid meter and good road access.",
    amenities: ["Prepaid Meter", "Borehole Water", "Gated Estate", "Parking Space"],
    images: im(5, 4, 3),
    status: "published", availability: "available", availableFrom: "2026-10-30",
    providerId: "pr1",
    checks: { identity: "verified", authority: "verified", listing: "verified", lastConfirmed: "2026-10-08" },
    views: 410, createdAt: "2026-09-10",
  },
  {
    id: "vi-1bed-apartment",
    title: "1 Bedroom Apartment",
    type: "Apartment",
    area: "Victoria Island",
    street: "Off Ajose Adeogun",
    rent: 5500000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 550000 },
      { label: "Legal / agreement fee (10%)", amount: 550000 },
      { label: "Service charge (annual)", amount: 1200000 },
    ],
    beds: 1, baths: 1, toilets: 2,
    description: "Contemporary 1 bedroom apartment with 24-hour power, ideal for young professionals working on the Island.",
    amenities: ["24/7 Security", "Serviced", "Backup Generator", "Air Conditioning", "Fitted Kitchen"],
    images: im(1, 4, 3),
    status: "published", availability: "available", availableFrom: "2026-11-01",
    providerId: "pr2",
    checks: { identity: "verified", authority: "verified", listing: "verified", lastConfirmed: "2026-10-14" },
    views: 780, createdAt: "2026-09-25",
  },
  {
    id: "ikeja-3bed-flat",
    title: "3 Bedroom Flat",
    type: "Flat",
    area: "Ikeja GRA",
    street: "Isaac John Street",
    rent: 4000000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 400000 },
      { label: "Legal / agreement fee (10%)", amount: 400000 },
      { label: "Caution deposit (refundable)", amount: 250000 },
    ],
    beds: 3, baths: 3, toilets: 4,
    description: "Well-kept 3 bedroom flat in a serene part of Ikeja GRA, close to the airport and Allen Avenue.",
    amenities: ["24/7 Security", "Prepaid Meter", "Borehole Water", "Wardrobes", "Parking Space"],
    images: im(5, 1, 4),
    status: "published", availability: "available", availableFrom: "2026-11-10",
    providerId: "pr3",
    checks: { identity: "verified", authority: "verified", listing: "pending" },
    views: 520, createdAt: "2026-09-18",
  },
  {
    id: "surulere-miniflat",
    title: "Mini Flat (1 Bedroom)",
    type: "Mini Flat",
    area: "Surulere",
    street: "Adelabu Street",
    rent: 1200000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 120000 },
      { label: "Legal / agreement fee (10%)", amount: 120000 },
    ],
    beds: 1, baths: 1, toilets: 1,
    description: "Compact, newly painted mini flat in a family compound. Close to the National Stadium and Ojuelegba.",
    amenities: ["Prepaid Meter", "Borehole Water"],
    images: im(3, 5),
    status: "published", availability: "available", availableFrom: "2026-10-20",
    providerId: "pr1",
    checks: { identity: "verified", authority: "verified", listing: "not_verified" },
    views: 300, createdAt: "2026-10-03",
  },
  // Not shown in search (status rules)
  {
    id: "lekki-4bed-semi",
    title: "4 Bedroom Semi-detached Duplex",
    type: "Semi-detached Duplex",
    area: "Lekki Phase 1",
    street: "Fola Osibo",
    rent: 9000000,
    period: "year",
    fees: [
      { label: "Agency fee (10%)", amount: 900000 },
      { label: "Legal / agreement fee (10%)", amount: 900000 },
      { label: "Caution deposit (refundable)", amount: 600000 },
    ],
    beds: 4, baths: 4, toilets: 5,
    description: "Spacious semi-detached duplex with boys' quarters, awaiting RentPaddy review.",
    amenities: ["24/7 Security", "Boys' Quarters", "Fitted Kitchen", "Parking Space"],
    images: im(2, 1, 4),
    status: "pending_review", availability: "available", availableFrom: "2026-12-01",
    providerId: "pr4",
    checks: { identity: "pending", authority: "not_verified", listing: "review_required" },
    views: 0, createdAt: "2026-10-15",
  },
  {
    id: "yaba-selfcon",
    title: "Self Contain",
    type: "Self Contain",
    area: "Yaba",
    street: "Onike",
    rent: 650000,
    period: "year",
    fees: [{ label: "Agency fee (10%)", amount: 65000 }],
    beds: 1, baths: 1, toilets: 1,
    description: "Self contain room near Unilag.",
    amenities: ["Prepaid Meter"],
    images: im(3),
    status: "let", availability: "let", availableFrom: "2026-09-01",
    providerId: "pr1",
    checks: { identity: "verified", authority: "verified", listing: "verified" },
    views: 820, createdAt: "2026-07-01",
  },
  {
    id: "ajah-3bed-terrace",
    title: "3 Bedroom Terrace",
    type: "Terrace",
    area: "Ajah",
    street: "Badore Road",
    rent: 3200000,
    period: "year",
    fees: [{ label: "Agency fee (10%)", amount: 320000 }],
    beds: 3, baths: 3, toilets: 4,
    description: "Terrace in a new estate. Photos need updating.",
    amenities: ["Gated Estate", "Prepaid Meter"],
    images: im(2),
    status: "changes_required", availability: "available", availableFrom: "2026-11-01",
    providerId: "pr2",
    checks: { identity: "verified", authority: "pending", listing: "review_required" },
    views: 0, createdAt: "2026-10-09",
    adminNote: "Please upload at least 4 current interior photos and a document showing your authority to let this property.",
  },
];

export const seedTenants: Tenant[] = [
  { id: "t1", name: "Chiamaka Obi", email: "chiamaka.obi@example.com", phone: "+234 803 555 0142", emailVerified: true, phoneVerified: true, identity: "verified", income: "pending", preferredAreas: ["Lekki Phase 1", "Yaba"], budgetMax: 5000000 },
  { id: "t2", name: "Emeka Nwosu", email: "emeka.n@example.com", phone: "+234 812 555 0199", emailVerified: true, phoneVerified: false, identity: "not_verified", income: "not_verified", preferredAreas: ["Ikeja GRA"], budgetMax: 4000000 },
];

export const seedViewings: Viewing[] = [
  { id: "v1", propertyId: "lekki-3bed-apartment", tenantId: "t1", date: "2026-10-21", time: "11:00", status: "confirmed", note: "I'll come with my sister.", createdAt: "2026-10-14" },
  { id: "v2", propertyId: "chevron-4bed-terrace", tenantId: "t1", date: "2026-10-12", time: "14:00", status: "completed", createdAt: "2026-10-06" },
  { id: "v3", propertyId: "yaba-2bed-flat", tenantId: "t1", date: "2026-10-23", time: "10:00", status: "reschedule_proposed", proposedDate: "2026-10-24", proposedTime: "13:00", createdAt: "2026-10-15" },
  { id: "v4", propertyId: "lekki-3bed-apartment", tenantId: "t2", date: "2026-10-22", time: "16:00", status: "requested", note: "Is the generator shared?", createdAt: "2026-10-16" },
  { id: "v5", propertyId: "vi-1bed-apartment", tenantId: "t2", date: "2026-10-20", time: "12:00", status: "requested", createdAt: "2026-10-16" },
];

export const seedApplications: Application[] = [
  { id: "a1", propertyId: "chevron-4bed-terrace", tenantId: "t1", status: "under_review", moveIn: "2026-11-20", occupants: 3, message: "We loved the property during the viewing. I work in Lekki and my husband in VI.", updatedAt: "2026-10-15" },
  { id: "a2", propertyId: "lekki-3bed-apartment", tenantId: "t2", status: "submitted", moveIn: "2026-11-05", occupants: 2, message: "Interested — available to provide references.", updatedAt: "2026-10-16" },
];

export const seedReports: Report[] = [
  { id: "r1", propertyId: "surulere-miniflat", reason: "Asked to pay before viewing", details: "Someone called claiming to be the agent and asked for an inspection fee transfer.", status: "open", createdAt: "2026-10-15" },
  { id: "r2", propertyId: "ikoyi-3bed-serviced", reason: "Price differs from listing", details: "Was quoted a higher service charge on the phone.", status: "investigating", createdAt: "2026-10-13" },
];

export const seedNotifications: Notification[] = [
  { id: "n1", to: "tenant", text: "Your viewing at 3 Bedroom Apartment, Lekki Phase 1 is confirmed for Tue 21 Oct, 11:00.", createdAt: "2026-10-15" },
  { id: "n2", to: "tenant", text: "Eze & Partners proposed a new time for 2 Bedroom Flat, Yaba.", createdAt: "2026-10-15" },
  { id: "n3", to: "tenant", text: "Your interest in 4 Bedroom Terrace, Chevron is now Under Review.", createdAt: "2026-10-15" },
  { id: "n4", to: "agent", text: "New viewing request for 3 Bedroom Apartment, Lekki Phase 1.", createdAt: "2026-10-16" },
  { id: "n5", to: "agent", text: "RentPaddy requested changes on 3 Bedroom Terrace, Ajah.", createdAt: "2026-10-12" },
  { id: "n6", to: "landlord", text: "Your listing 2 Bedroom Flat, Yaba was viewed 48 times this week.", createdAt: "2026-10-14" },
  { id: "n7", to: "admin", text: "New listing submitted: 4 Bedroom Semi-detached Duplex, Lekki Phase 1.", createdAt: "2026-10-15" },
];

/** Only approved Published + Available properties appear in marketplace search. */
export function isPubliclyListed(p: Pick<Property, "status" | "availability">) {
  return p.status === "published" && p.availability === "available";
}

/** A property earns the "Verified Property" badge only when every check has passed. */
export function isVerifiedProperty(p: Pick<Property, "checks">) {
  return (
    p.checks.identity === "verified" &&
    p.checks.authority === "verified" &&
    p.checks.listing === "verified"
  );
}

export function totalMoveInCost(p: Pick<Property, "rent" | "fees">) {
  return p.rent + p.fees.reduce((s, f) => s + f.amount, 0);
}
