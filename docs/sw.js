/* global globalThis */
const { addEventListener, fetch, caches } = globalThis

addEventListener('install', event => {
    event.waitUntil(
        caches.open('swr').then(cache => {
            return cache.addAll([
                '/offline.html',
            ])
        }),
    )
})

addEventListener('fetch', event => event.respondWith(caches.open('swr').then(async cache => {
    const cacheRes = cache.match(event.request)
    const newRes = fetch(event.request).then(res => {
        cache.put(event.request, res.clone())
        return res
    }).catch(reason => caches.match('/offline.html'))
    return cacheRes || newRes
})))
