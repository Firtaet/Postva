<template>
  <div class="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
    <!-- Premium Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#5288c1_1px,transparent_1px),linear-gradient(to_bottom,#5288c1_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]"></div>
    </div>

    <div class="container relative z-10 mx-auto px-4 pt-32 pb-24">
      <div class="flex flex-col lg:flex-row gap-12 xl:gap-24">
        
        <!-- Sticky Sidebar Navigation -->
        <aside class="lg:w-80 flex-shrink-0">
          <div class="sticky top-32 space-y-8">
            <div>
              <NuxtLink to="/" class="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 group">
                <Icon name="ph:arrow-left-bold" class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span class="text-xs font-black uppercase tracking-widest">Вернуться</span>
              </NuxtLink>
              
              <h1 class="text-4xl font-black text-white tracking-tighter mb-2">Legal</h1>
              <p class="text-xs font-bold text-primary uppercase tracking-widest">POSTVA / 2026</p>
            </div>

            <!-- Page Switcher -->
            <div class="flex p-1 bg-white/5 rounded-xl border border-white/5">
              <NuxtLink to="/terms" class="flex-1 py-2 text-center text-xs font-black uppercase tracking-widest rounded-lg transition-all" 
                         :class="$route.path === '/terms' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'">
                Terms
              </NuxtLink>
              <NuxtLink to="/privacy" class="flex-1 py-2 text-center text-xs font-black uppercase tracking-widest rounded-lg transition-all"
                         :class="$route.path === '/privacy' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'">
                Privacy
              </NuxtLink>
            </div>

            <!-- Table of Contents -->
            <nav class="hidden lg:block space-y-1 pt-4 border-t border-white/5">
              <a v-for="(item, i) in toc" :key="i" :href="'#' + item.id" 
                 class="block py-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                {{ item.label }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 max-w-3xl">
          <div class="prose prose-invert max-w-none">
            <h2 class="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter italic">Условия <br/> использования</h2>
            
            <div class="space-y-20 pb-20">
              <section id="basics" class="scroll-mt-32">
                <div class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Раздел 01</div>
                <h3 class="text-3xl font-black text-white mb-6">Основные правила</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Используя POSTVA, вы соглашаетесь с условиями. Наша платформа предназначена для профессиональной автоматизации. Мы предоставляем инструменты, вы — контент.
                </p>
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10 italic text-sm text-foreground/80">
                  Мы оставляем за собой право обновлять данные правила. Ваше дальнейшее использование сервиса означает согласие с изменениями.
                </div>
              </section>

              <section id="account" class="scroll-mt-32">
                <div class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Раздел 02</div>
                <h3 class="text-3xl font-black text-white mb-6">Ваш Аккаунт</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Регистрация возможна только через авторизованные социальные сети. Вы несете полную ответственность за действия, совершаемые под вашим аккаунтом.
                </p>
                <ul class="space-y-4">
                  <li v-for="rule in ['Один аккаунт — одна личность', 'Запрещена передача доступа третьим лицам', 'Ответственность за безопасность токенов Telegram на вашей стороне']" 
                      class="flex gap-4 text-muted-foreground text-sm font-medium">
                    <Icon name="ph:caret-right-bold" class="text-primary w-5 h-5 flex-shrink-0" />
                    {{ rule }}
                  </li>
                </ul>
              </section>

              <section id="ai" class="scroll-mt-32">
                <div class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Раздел 03</div>
                <h3 class="text-3xl font-black text-white mb-6">Интеллектуальная собственность</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Контент, сгенерированный с помощью наших AI-инструментов, принадлежит вам. Однако POSTVA не несет ответственности за возможные нарушения авторских прав при использовании сгенерированных текстов.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-6 rounded-2xl bg-secondary/30 border border-white/5">
                    <Icon name="ph:check-circle-fill" class="text-primary w-8 h-8 mb-4" />
                    <div class="text-white font-bold text-sm">Вы владелец</div>
                    <div class="text-[11px] text-muted-foreground mt-1">Все права на публикации за вами.</div>
                  </div>
                  <div class="p-6 rounded-2xl bg-secondary/30 border border-white/5">
                    <Icon name="ph:warning-circle-fill" class="text-accent w-8 h-8 mb-4" />
                    <div class="text-white font-bold text-sm">Наш код</div>
                    <div class="text-[11px] text-muted-foreground mt-1">Дизайн и алгоритмы защищены POSTVA.</div>
                  </div>
                </div>
              </section>

              <section id="liability" class="scroll-mt-32">
                <div class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Раздел 04</div>
                <h3 class="text-3xl font-black text-white mb-6">Ограничение ответственности</h3>
                <p class="text-muted-foreground text-lg leading-relaxed">
                  Мы стремимся к безотказной работе 24/7, но сервис предоставляется «как есть». Мы не несем ответственности за блокировки каналов со стороны администрации Telegram.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const toc = [
  { id: 'basics', label: 'Основные правила' },
  { id: 'account', label: 'Ваш аккаунт' },
  { id: 'ai', label: 'AI и права' },
  { id: 'liability', label: 'Ответственность' },
]

useSeoMeta({
  title: 'Terms of Use | POSTVA',
})
</script>
