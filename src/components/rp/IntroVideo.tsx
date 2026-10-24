import { useState } from 'react';
import { Play, Film, ArrowUpRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/data';
import { brandConfig } from '@/lib/brand-config';
export function IntroVideo() {
 const [opened,setOpened]=useState(false); const [failed,setFailed]=useState(false);
 const playable=!!brandConfig.video.src&&!failed;
 return <section id="meet-rentpaddy" className="container-rp scroll-mt-24 py-14 md:py-20" aria-labelledby="video-heading">
  <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 text-sm font-semibold text-primary">A better way to begin</p><h2 id="video-heading" className="text-3xl font-bold text-primary-deep md:text-4xl">Meet RentPaddy.<br/>Renting, made simpler.</h2></div><Button variant="outline" asChild><Link to="/how-it-works">Explore the rental journey <ArrowUpRight/></Link></Button></div>
  <div className="relative aspect-video overflow-hidden rounded-lg bg-primary-deep">
   {opened&&playable?<video className="h-full w-full object-contain" controls playsInline preload="none" poster={IMAGES.hero} onError={()=>setFailed(true)} aria-label="Introducing RentPaddy"><source src={brandConfig.video.src} type={brandConfig.video.type}/>{brandConfig.video.captions&&<track kind="captions" src={brandConfig.video.captions} srcLang="en" label="English" default/>}Your browser cannot play this video.</video>:<><img src={IMAGES.hero} alt="Residential apartment buildings — RentPaddy introduction preview" loading="lazy" width={1600} height={1008} className="h-full w-full object-cover"/><div className="hero-overlay absolute inset-0"/><div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-primary-foreground"><Button variant="gold" size="icon" className="h-16 w-16 rounded-full" aria-label={playable?'Play RentPaddy introduction':'Show introduction video availability'} onClick={()=>setOpened(true)}><Play className="h-6 w-6 fill-current"/></Button><span className="text-sm font-semibold">{playable?'Watch our introduction':'Introduction film · Coming soon'}</span></div></>}
  </div>
  {opened&&!playable&&<div role="status" className="mt-4 flex items-start gap-3 border-l-2 border-gold bg-gold-soft p-4"><Film className="h-5 w-5 shrink-0 text-primary"/><p className="text-sm">{failed?'The introduction video is currently unavailable.':'Our 20–35-second introduction film is being prepared. No video has been published yet.'} You can explore the rental journey on our How It Works page.</p></div>}
 </section>;
}
