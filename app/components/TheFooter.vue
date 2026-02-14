<template>
  <footer class="relative pt-24 pb-12 bg-background border-t border-white/5 overflow-hidden">
    <!-- Abstract light source -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/10 blur-[120px] -z-10 rounded-full"></div>

    <div class="container relative z-10 mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <!-- Brand Info -->
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
          <div class="flex gap-4">
             <NuxtLink v-for="i in ['telegram', 'twitter', 'github']" :key="i" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary transition-all">
                <Icon :name="`ph:${i}-logo-fill`" class="w-5 h-5" />
             </NuxtLink>
          </div>
        </div>

        <!-- Links Groups -->
        <div>
          <h5 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Продукт</h5>
          <ul class="space-y-4 text-sm text-muted-foreground">
            <li><NuxtLink to="#features" class="hover:text-primary transition-colors">Возможности</NuxtLink></li>
            <li><NuxtLink to="#pricing" class="hover:text-primary transition-colors">Цены</NuxtLink></li>
            <li><NuxtLink to="#how-it-works" class="hover:text-primary transition-colors">Интеграции</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-primary transition-colors">Блог</NuxtLink></li>
          </ul>
        </div>

        <div>
           <h5 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Поддержка</h5>
           <ul class="space-y-4 text-sm text-muted-foreground">
            <li><NuxtLink to="/docs" class="hover:text-primary transition-colors">Документация</NuxtLink></li>
            <li><NuxtLink to="#faq" class="hover:text-primary transition-colors">FAQ</NuxtLink></li>
            <li><NuxtLink to="https://t.me/support" class="hover:text-primary transition-colors">Чат поддержки</NuxtLink></li>
            <li><NuxtLink to="/teapot" class="hover:text-accent transition-colors">Чайник 418</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter or Contact -->
        <div>
           <h5 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Новости POSTVA</h5>
           <p class="text-muted-foreground text-xs mb-6">Подпишитесь, чтобы получать советы по росту каналов в Telegram.</p>
           <form class="flex gap-2">
              <input type="email" placeholder="Email" class="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors" />
              <button class="bg-primary text-white p-2 rounded-xl hover:bg-accent transition-colors">
                 <Icon name="ph:paper-plane-right-fill" class="w-5 h-5" />
              </button>
           </form>
        </div>
      </div>

      <!-- Copyright Area -->
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
