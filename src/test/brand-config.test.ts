import {describe,it,expect} from 'vitest';
import {brandConfig,isPublishedStoreUrl} from '@/lib/brand-config';
describe('Unpublished assets remain unavailable',()=>{
 it('has no invented video or store sources',()=>{expect(brandConfig.video.src).toBe('');expect(brandConfig.video.captions).toBe('');expect(brandConfig.stores.googlePlay).toBe('');expect(brandConfig.stores.appStore).toBe('');});
 it('accepts only secure URLs on the correct store',()=>{expect(isPublishedStoreUrl('https://play.google.com/store/apps/details?id=demo','googlePlay')).toBe(true);expect(isPublishedStoreUrl('https://apps.apple.com/app/demo','appStore')).toBe(true);expect(isPublishedStoreUrl('https://example.com/app','appStore')).toBe(false);expect(isPublishedStoreUrl('http://play.google.com/store/apps','googlePlay')).toBe(false);expect(isPublishedStoreUrl('','googlePlay')).toBe(false);});
});
