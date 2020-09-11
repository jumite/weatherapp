'use strict'

var time = (new Date()).getMilliseconds();
const CACHE_NAME = 'static-cache-v'+Math.random();

const FILES_TO_CACHE = [
    '/offline_index.html',
    './styles/main.css',
    './images/cloud.jpg',
    '/script/app.js',
    '/'
  ];

  self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
  
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (evt) => {
      evt.respondWith(
        caches.match(evt.request)
        .then(caches.open('/offline_html'))
    )
  });