// Populate only with approved, published assets. Empty values deliberately stay unavailable.
export const brandConfig = {
  video: { src: '', captions: '', type: 'video/mp4' },
  stores: { googlePlay: '', appStore: '' },
};
export function isPublishedStoreUrl(value: string, store: 'googlePlay' | 'appStore') {
  try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === (store === 'googlePlay' ? 'play.google.com' : 'apps.apple.com'); } catch { return false; }
}
