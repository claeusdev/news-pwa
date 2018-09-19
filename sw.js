const statics = [
    './',
    './src/sass',
    './src/js/app.js'
]

self.addEventListener('install', async e => {
    const cache = await caches.open('news-static')
    cache.addAll(statics)
})

self.addEventListener('fetch', e => {
    const req = e.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkFirst(req))
    }
})


async function cacheFirst(req) {
    const cachedResponse = await caches.match(req)
    return cachedResponse || fetch(req)
}

async function networkFirst(req) {
    const cache = await caches.open('news-dynamic')

    try {
        // Fetch new stuff from network
        const res = await fetch(req)

        // Put in the cache
        cache.put(req, res.clone())

        return res
    } catch (error) {
        return await cache.match(req)
    }
}