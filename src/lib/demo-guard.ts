import { redirect } from '@tanstack/react-router';
import type { Role } from './data';
export function guardDemo(role?: Role) {
 const raw=localStorage.getItem('rentpaddy-demo-v1');
 let s; try{s=JSON.parse(raw || '{}');}catch{s={};}
 if(!s.session || s.session.role==='guest') throw redirect({to:'/sign-in',search:{redirect:location.pathname}});
 if(role && s.session.role!==role) throw redirect({to:'/access-denied'});
 const actor=[...(s.tenants||[]),...(s.providers||[])].find((a:{id:string})=>a.id===s.session.actorId);
 if(actor?.suspended) throw redirect({to:'/access-denied'});
}
