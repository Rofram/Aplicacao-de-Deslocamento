if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),f={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>f[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"72f11279212370b6558c597c79b60eab"},{url:"/_next/static/JM08lI0hUD8vqX9lOIHUm/_buildManifest.js",revision:"a2fca4e7c42d36e6bd2b18d2c2583e62"},{url:"/_next/static/JM08lI0hUD8vqX9lOIHUm/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/26.098c5341ffd17325.js",revision:"098c5341ffd17325"},{url:"/_next/static/chunks/455-478ef03471767c47.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/679.9a9f86c72b250ef9.js",revision:"9a9f86c72b250ef9"},{url:"/_next/static/chunks/909-04cdfc6f8c797ced.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/app/global-error-dffce76aac4f6497.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/app/layout-434a685214f5d8fe.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/app/page-9a654d8ebe616def.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/framework-b98d517ce5ea2f71.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/main-app-1cab0a338f26286e.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/main-b5165d28a96e52fe.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/pages/_app-907dedfd0e4177db.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/pages/_error-b5ee443ea3f1b36c.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-106f1e05f3ee9d81.js",revision:"JM08lI0hUD8vqX9lOIHUm"},{url:"/_next/static/css/33b2f99b2295dae9.css",revision:"33b2f99b2295dae9"},{url:"/_next/static/css/fec4888ac0f1ba4f.css",revision:"fec4888ac0f1ba4f"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/icons/icon-192.png",revision:"27d379467eb235970ed2f020b8a7ff8f"},{url:"/icons/icon-512.png",revision:"334aaa20b3b86469ae86f307b8237df7"},{url:"/manifest.json",revision:"7eed94fd6c64a2a1ea74a149ac1a2639"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/robots.txt",revision:"cc82fea14a75a25eedc657dcbf93163e"},{url:"/sitemap-0.xml",revision:"7e6ab917622ed3c1575753c456cb0c95"},{url:"/sitemap.xml",revision:"d6bf0336c97af28283652fe889e5af61"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));