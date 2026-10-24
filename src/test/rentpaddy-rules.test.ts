import {describe,it,expect} from 'vitest';
import {isPubliclyListed,isVerifiedProperty,totalMoveInCost,seedProperties} from '@/lib/data';
import {registrationSchema} from '@/lib/demo-auth';
describe('RentPaddy business rules',()=>{
 it('shows only Published + Available properties',()=>{expect(isPubliclyListed({status:'published',availability:'available'})).toBe(true);for(const status of ['draft','pending_review','changes_required','paused','let','rejected','archived'] as const)expect(isPubliclyListed({status,availability:'available'})).toBe(false);expect(isPubliclyListed({status:'published',availability:'let'})).toBe(false);});
 it('requires all three completed checks for Verified Property',()=>{expect(isVerifiedProperty({checks:{identity:'verified',authority:'verified',listing:'verified'}})).toBe(true);expect(isVerifiedProperty({checks:{identity:'verified',authority:'pending',listing:'verified'}})).toBe(false);});
 it('displays rent plus all known fees',()=>{const p=seedProperties.find(p=>p.id==='lekki-3bed-apartment');expect(p).toBeDefined();if(p)expect(totalMoveInCost(p)).toBe(6300000);});
 it('allows only tenant, landlord and agent registration',()=>{const v={first:'Demo',last:'User',email:'demo@example.com',phone:'+2348035550000',password:'demo12345',confirm:'demo12345',terms:true};expect(registrationSchema.safeParse({...v,role:'admin'}).success).toBe(false);for(const role of ['tenant','landlord','agent'])expect(registrationSchema.safeParse({...v,role}).success).toBe(true);});
});

import {canManageListing,isActiveActor,DEMO_ACCOUNTS,type State} from '@/lib/store';
import {providers,seedTenants} from '@/lib/data';
function demoState(role: keyof typeof DEMO_ACCOUNTS): State {return {session:DEMO_ACCOUNTS[role],properties:seedProperties,providers,tenants:seedTenants,viewings:[],applications:[],reports:[],notifications:[],saved:[]};}
describe('Demo account restrictions',()=>{
 it('only the authorised provider manages their listing',()=>{const s=demoState('landlord');const own=seedProperties.find(p=>p.providerId===s.session.actorId);const other=seedProperties.find(p=>p.providerId!==s.session.actorId);if(!own||!other)throw new Error('Missing test properties');expect(canManageListing(s,own)).toBe(true);expect(canManageListing(s,other)).toBe(false);expect(canManageListing(demoState('tenant'),own)).toBe(false);});
 it('suspended providers cannot manage listings',()=>{const s=demoState('landlord');s.providers=s.providers.map(p=>({...p,suspended:p.id===s.session.actorId}));expect(isActiveActor(s)).toBe(false);const p=seedProperties.find(p=>p.providerId===s.session.actorId);if(!p)throw new Error('Missing test property');expect(canManageListing(s,p)).toBe(false);});
});
