import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/rp/AccountPages';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/sign-up')({validateSearch: (s: Record<string, unknown>) => ({...s}),head:()=>pageHead('Sign Up','RentPaddy sign-up — Lagos residential rental journey.'),component:()=> <AuthPage signup/>});
