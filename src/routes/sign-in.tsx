import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/rp/AccountPages';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/sign-in')({validateSearch: (s: Record<string, unknown>) => ({...s}),head:()=>pageHead('Sign In','RentPaddy sign-in — Lagos residential rental journey.'),component:()=> <AuthPage/>});
