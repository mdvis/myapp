console.log(self)

let cacheName = 'initCache'

self.addEventListener('install',e=>{
  e.waitUntil(
  caches.open(cacheName)
    .then(cache=>cache.addAll(['./page.js']))
  )
  console.log(e)
})
self.addEventListener('fetch',e=>{console.log(e)})
