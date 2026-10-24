import {createFileRoute} from '@tanstack/react-router';
import {ListingWizard} from '@/components/rp/ListingWizard';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/list-property')({validateSearch: (s: Record<string, unknown>) => ({...s}),head:()=>pageHead('List Property','RentPaddy list-property — Lagos residential rental journey.'),component:()=> <ListingWizard/>});
