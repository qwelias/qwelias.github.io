/* eslint-env serviceworker */

self.addEventListener('install', (/** @type {ExtendableEvent} */event) =>
    event.waitUntil(
        caches.open('all').then(cache => {
            return cache.addAll([
                '/offline.html',
            ])
        }),
    ),
)

self.addEventListener('fetch', (/** @type {FetchEvent} */event) =>
    event.waitUntil(caches.open('swr').then(async cache => {
        const res = await cache.match(event.request)
        const rres = fetch(event.request).then(res => {
            cache.put(event.request, res.clone())
            return res
        })

        event.respondWith(res || await rres.catch(() => cache.match('/offline.html')))
    })),
)
