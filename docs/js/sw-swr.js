/* global globalThis */
const { addEventListener, caches } = globalThis

addEventListener('fetch', event => event.respondWith(caches.open('swr').then(async cache => {
    const res = await cache.match(event.request)
    cache.add(event.request)
    return res || cache.match(event.request)
})))
