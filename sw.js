if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const o=e=>i(e,a),f={module:{uri:a},exports:c,require:o};s[a]=Promise.all(n.map((e=>f[e]||o(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-e22e9f09.js",revision:null},{url:"index.html",revision:"f8a66e7fc61b1d24ee193bc6e385c56a"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"misc/favicon.png",revision:"5b0038571ed2d9ec6c1bf4810dc0b17c"},{url:"misc/favicon-48.png",revision:"0af2f3634214a65dc1c341eb39ea9574"},{url:"misc/favicon-96.png",revision:"b213bd50a9be5a3f4307e330e4ec018a"},{url:"misc/favicon-192.png",revision:"e8df6366a0037e7a97f548fdf7bf68c9"},{url:"assets/background-game.jpg",revision:"15b62a1483b7fe6367a18d0698e51250"},{url:"assets/background-intro.jpg",revision:"f8a63951f809300f5d64f1356343efb5"},{url:"assets/background-menu.jpg",revision:"0f7b57c5b0c156b31e097bc572dd54ec"},{url:"assets/button-start.png",revision:"acb9a04d262b6f0571bcb00b1056727b"},{url:"assets/cut.png",revision:"0f6301f16e3535d5183f163a10f1e6c3"},{url:"assets/isotipo.png",revision:"2f14918600ee0182342706c92423f098"},{url:"assets/key.png",revision:"3fe0ca6f48761dc0e82bf2711f3718dc"},{url:"assets/level.png",revision:"43cccad91bee6097c48d3b54dc75e4b6"},{url:"assets/logotipo.png",revision:"68f964ae3c8b4473575dbe2edf04d7d7"},{url:"assets/mannequin-arm.png",revision:"aa4a0a5405574a45e66cfd0d14112319"},{url:"assets/mannequin.png",revision:"ba2ac78d1d3ce33d54f7b85ec28406d3"},{url:"assets/robot-1.png",revision:"91a923ca244e780aeeb8f40c62291e38"},{url:"assets/robot-2.png",revision:"fef9a3bfd5bcc255c46f56ee6dda4ada"},{url:"assets/robot-3.png",revision:"a8c1c48eed2be160e3b668f06a6fb79a"},{url:"assets/robot-4.png",revision:"7fc32a7597c01ba12ff7acbe0fb9605c"},{url:"assets/robot-arm-1.png",revision:"32be396d20b9853b440bd125f9db59f3"},{url:"assets/rock.png",revision:"59a5f04e642243f27138d75e1a2a7ceb"},{url:"assets/sheet.png",revision:"9e83a92d681164cf4b642acdec606b24"},{url:"manifest.webmanifest",revision:"5a4d0f490f59c43e16fb47acdc8399ce"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
