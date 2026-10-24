import {createFileRoute} from '@tanstack/react-router';
import {RentPage} from '@/components/rp/RentPage';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/rent')({validateSearch: (s: Record<string, unknown>) => ({...s}),head:()=>pageHead('Rent','RentPaddy rent — Lagos residential rental journey.'),component:()=> <RentPage/>});
