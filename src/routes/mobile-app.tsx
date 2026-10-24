import {createFileRoute} from '@tanstack/react-router';
import {MobileAppShowcase} from '@/components/rp/MobileApp';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/mobile-app')({head:()=>pageHead('RentPaddy mobile app — Coming soon','Search Lagos homes, save your shortlist and track viewings. Explore the RentPaddy mobile app concept and demo launch waitlist.'),component:()=> <MobileAppShowcase dedicated/>});
