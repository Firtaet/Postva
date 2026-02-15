<template>
  <footer class="relative pt-24 pb-12 bg-background border-t border-white/5 overflow-hidden">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/10 blur-[120px] -z-10 rounded-full"></div>

    <div class="container relative z-10 mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div class="space-y-6">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <Icon name="ph:paper-plane-tilt-fill" class="w-6 h-6" />
            </div>
            <span class="text-2xl font-black tracking-tighter text-white">POSTVA</span>
          </NuxtLink>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Будущее автоматизации Telegram каналов. Мы помогаем админам расти быстрее и зарабатывать больше с помощью AI технологий.
          </p>
        </div>

        <nav class="flex flex-col gap-4">
          <span class="text-xs uppercase tracking-[0.2em] font-bold text-primary/80 mb-2">Navigation</span>
          <div class="grid grid-cols-1 gap-2">
            <NuxtLink to="/" class="footer-link">Home</NuxtLink>
            <NuxtLink to="/blog" class="footer-link">Blog</NuxtLink>
            <NuxtLink to="/teapot" class="footer-link">Teapot</NuxtLink>
            <NuxtLink to="/contact-us" class="footer-link">Contact</NuxtLink>
            <NuxtLink to="/newsletter" class="footer-link">Newsletter</NuxtLink>
            <NuxtLink to="/docs" class="footer-link">Docs</NuxtLink>
            <NuxtLink to="/steam-gift" class="footer-link">Steam Gift</NuxtLink>
            <NuxtLink to="/about" class="footer-link">About</NuxtLink>
            <NuxtLink to="/faq" class="footer-link">FAQ</NuxtLink>
            <NuxtLink to="/submit" class="footer-link">Submit</NuxtLink>
          </div>
        </nav>
      </div>
      <nav class="flex flex-col gap-4">
          <span class="text-xs uppercase tracking-[0.2em] font-bold text-primary/80 mb-2">Social Presence</span>
          <div class="grid grid-cols-1 gap-2">
            <a href="https://x.com/firtaet" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:x-logo" /> X
            </a>
            <a href="https://github.com/Firtaet" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:github-logo" /> GitHub
            </a>
            <a href="https://www.reddit.com/user/Happy-Musician-8704/" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:reddit-logo" /> Reddit
            </a>
            <a href="https://news.ycombinator.com/user?id=firtaet" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:newspaper-clipping" /> Hacker News
            </a>
            <a href="https://steamcommunity.com/profiles/76561199180758185" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:steam-logo" /> Steam
            </a>
            <a href="https://www.producthunt.com/@firtaet" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="i-ps:any-solvent-without-tetrachlorethylene" /> Product Hunt
            </a>
            <a href="https://www.youtube.com/@postva-z6l" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:youtube-logo" /> YouTube
            </a>
            <a href="https://www.tiktok.com/@postva5" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:tiktok-logo" /> TikTok
            </a>
            <a href="https://t.me/+p0FYfqMjU6FkZjky" target="_blank" class="flex items-center gap-2 footer-link">
              <Icon name="ph:telegram-logo" /> Telegram
            </a>
          </div>
        </nav>
         <nav class="flex flex-col gap-4">
          <span class="text-xs uppercase tracking-[0.2em] font-bold text-primary/80 mb-2">Other Projects</span>
          <div class="grid grid-cols-1 gap-2">
            <a href="https://www.simplesvgs.online/" target="_blank" class="footer-link">Simple SVGs</a>
            <a href="https://www.neuroreel.biz/" target="_blank" class="footer-link">Neuroreel</a>
            <a href="https://www.prevify.online/" target="_blank" class="footer-link">Prevify</a>
            <a href="https://www.postva.xyz/" target="_blank" class="footer-link">Postva</a>
          </div>
        </nav>

      <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
         <div>&copy; 2026 POSTVA INC. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
         <div class="flex gap-8">
            <NuxtLink to="/terms" class="hover:text-white transition-colors">Условия</NuxtLink>
            <NuxtLink to="/privacy" class="hover:text-white transition-colors">Конфиденциальность</NuxtLink>
            <NuxtLink to="/cookies" class="hover:text-white transition-colors">Cookies</NuxtLink>
         </div>
      </div>
      
    </div>
  </footer>
</template>
