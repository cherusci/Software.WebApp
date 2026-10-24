import {createFileRoute} from '@tanstack/react-router';
import {RecoveryPage} from '@/components/rp/AccountPages';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/forgot-password')({head:()=>pageHead('Forgot Password','RentPaddy forgot-password — Lagos residential rental journey.'),component:()=> <RecoveryPage/>});
