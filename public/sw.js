if(!self.define){let e,n={};const s=(s,c)=>(s=new URL(s+".js",c).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(n[i])return;let a={};const r=e=>s(e,i),o={module:{uri:i},exports:a,require:r};n[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(t(...e),a)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"504492f909e74cb099fad3f63d84e984"},{url:"/_next/static/chunks/05f6971a.949bb69a40b1f54e.js",revision:"949bb69a40b1f54e"},{url:"/_next/static/chunks/1319-ef5d42082e6ed853.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/1365-e364085da46a5c38.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/1390-f2a648c0d639b997.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/1517-dde1189e97d388e6.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/2007.7a440217d211dcdf.js",revision:"7a440217d211dcdf"},{url:"/_next/static/chunks/243dde97.2836af092832bed3.js",revision:"2836af092832bed3"},{url:"/_next/static/chunks/2615-129ccd9dc8c80912.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/3470-720c95b7befba109.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/3499-1783d869e56821e7.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/3519.945f60d2c378cbef.js",revision:"945f60d2c378cbef"},{url:"/_next/static/chunks/3638-cfb6a3793f547686.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/4177-0465447dc370d443.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/4bd1b696-cc98997aee7d8abb.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/5203.f4b97ab553880bca.js",revision:"f4b97ab553880bca"},{url:"/_next/static/chunks/6218.ec477fe67fb19468.js",revision:"ec477fe67fb19468"},{url:"/_next/static/chunks/6732-e62d5890264f2b2f.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/7127-ea89a9023adf5725.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/724-cbbbf99177b03bf3.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/7970-58d6e1f47af13446.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/8173-4060dbb0bad56130.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/9816-31c84bb0beabbf51.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/authenticated/page-953e3ddf919decf1.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/books/%5Bid%5D/page-82cba64f99b59cbb.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/books/layout-d5db0902c8d566a5.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/books/page-44c21f85f3dda5ff.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/client-page/loading-cc30bc31181d488c.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/client-page/page-05f8b74aeefc3329.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/docs/%5B...slug%5D/page-c41b6862ca08086c.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/docs/layout-ed8d4fdec27a85fb.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/docs/page-7a295deb6c6dc292.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/editor/page-ba0696fbd407f20d.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/hook-page/loading-425c6664ad7c6668.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/hook-page/page-af282bd260500b85.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/layout-20569ca014ec0771.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/login/page-ef9a475bc5f5233e.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/map/layout-9bceae549258f593.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/map/loading-d2fa3b7436543086.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/map/page-dfbfc060a3ad397c.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/page-cbf4ce8623622837.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/place/loading-0ba7508e22d06497.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/place/page-203d03934f7881b9.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/privacy/page-645efcc020f69d4e.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/rtc/page-a3bdd9598d91e092.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/(frontend)/tos/page-61bcb55a549dbc2b.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/_not-found/page-ab29dd7ebd56bdad.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-7b19b96ecf1b39d1.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/cookie/route-a08531fce426e750.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/db/route-7226302be1d41fec.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/file/route-143c645f6f134803.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/get-data/route-0cd0c7fa27827520.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/params/route-c893fec4e9f82297.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/register/route-4e201abcda7d22ce.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/trpc/%5B...trpc%5D/route-f08315c711a0de98.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/api/ws/%5B...vars%5D/route-c889d127279de910.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/global-error-4e74f2772618c07b.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/layout-355e3b807a60f94f.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/loading-51b90100808f0029.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/app/not-found-45b59f4289f89a0c.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/framework-f840e08b65b2bbef.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/main-6323ff6f61563607.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/main-app-8b4638e9859b53fb.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/pages/_app-8fa6af697a78d474.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/pages/_error-00409b70658ebea4.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-b3b6ba2eec4e5152.js",revision:"mh93n090C2j7EyP2jlc1h"},{url:"/_next/static/css/11b9f0c1270f51e0.css",revision:"11b9f0c1270f51e0"},{url:"/_next/static/css/718ee59ff2172a97.css",revision:"718ee59ff2172a97"},{url:"/_next/static/css/8405f2f5e84d3208.css",revision:"8405f2f5e84d3208"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/mh93n090C2j7EyP2jlc1h/_buildManifest.js",revision:"e88e1be5f38145b56e4f9d485e80cbf4"},{url:"/_next/static/mh93n090C2j7EyP2jlc1h/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/logo_sqr-128.png",revision:"19d4a8367075469a2df22e82f8df561c"},{url:"/icons/logo_sqr-144.png",revision:"fc75607be381f751904a50bb8179eb7f"},{url:"/icons/logo_sqr-152.png",revision:"2bafa87419d7a4910e85881200c331af"},{url:"/icons/logo_sqr-16.png",revision:"49395edb7d5b79e1553967ccba78c555"},{url:"/icons/logo_sqr-180.png",revision:"dd67ff77ee5e291d23b23fbaaf0f4ba1"},{url:"/icons/logo_sqr-192.png",revision:"64c12320735d5ac4dbdff896f0dc4ea3"},{url:"/icons/logo_sqr-256.png",revision:"57bf0b05b60df86d0ba92ebcb4ca8b71"},{url:"/icons/logo_sqr-48.png",revision:"5516e328fc4011c746ef37c265fd84b1"},{url:"/icons/logo_sqr-512.png",revision:"98b2726e154582a2184e2d8a3db95484"},{url:"/icons/logo_sqr-64.png",revision:"6db23b3465cb81867599fb6f2bbe707b"},{url:"/icons/logo_sqr-72.png",revision:"dd0d47151a0362d9c5c125c17a6846ab"},{url:"/icons/logo_sqr-96.png",revision:"7723c76345c4b69bcc6df131345d9ee2"},{url:"/manifest.json",revision:"fec350f59c317adffb20ee7aa4114948"},{url:"/worker.js",revision:"da672843ec4165afda42b179392b3756"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:c})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
