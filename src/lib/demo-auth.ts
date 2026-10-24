import { actions, newId, type Session } from './store';
import { z } from 'zod';
export const registrationSchema = z.object({ first: z.string().trim().min(1).max(60), last: z.string().trim().min(1).max(60), email: z.string().trim().email().max(255), phone: z.string().regex(/^\+?[0-9\s-]{10,18}$/, 'Enter a valid phone number'), password: z.string().min(8, 'Use at least 8 characters').max(100), confirm: z.string(), terms: z.literal(true), role: z.enum(['tenant','landlord','agent']) }).refine(v => v.password === v.confirm, { message: 'Passwords do not match', path: ['confirm'] });
type DemoAccount = { session: Session; salt: string; digest: string; phone: string };
const key = 'rentpaddy-demo-accounts';
function accounts(): DemoAccount[] { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } }
async function hash(password: string, salt: string) { const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + password)); return Array.from(new Uint8Array(buffer)).map(v => v.toString(16).padStart(2, '0')).join(''); }
export async function registerDemo(input: unknown) {
 const v = registrationSchema.parse(input); const all = accounts();
 if (all.some(a => a.session.email === v.email.toLowerCase())) throw new Error('An account with this email already exists in this browser.');
 const session: Session = { role:v.role, name:`${v.first} ${v.last}`, email:v.email.toLowerCase(), actorId:newId(v.role === 'tenant' ? 't' : 'pr') };
 const salt = crypto.randomUUID(); const digest = await hash(v.password, salt);
 all.push({session,salt,digest,phone:v.phone}); localStorage.setItem(key,JSON.stringify(all));
 actions.createDemoProfile(session,v.phone); actions.signIn(v.role, session); return session;
}
export async function loginDemo(email: string, password: string) {
 const v = z.object({email:z.string().email(),password:z.string().min(1)}).parse({email,password});
 const a = accounts().find(a => a.session.email === v.email.toLowerCase());
 if (!a || await hash(v.password,a.salt) !== a.digest) throw new Error('Email or password is incorrect. Use a demo account below, or register in this browser.');
 if(a.session.role === 'guest' || a.session.role === 'admin') throw new Error('Invalid account role.');
 actions.signIn(a.session.role,a.session); return a.session;
}
