import {createFileRoute} from '@tanstack/react-router';
import {OnboardingPage} from '@/components/rp/AccountPages';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/onboarding')({head:()=>pageHead('Onboarding','RentPaddy onboarding — Lagos residential rental journey.'),component:()=> <OnboardingPage/>});
