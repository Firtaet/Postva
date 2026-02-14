<template>
  <div class="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
    <!-- Premium Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(82,136,193,0.05)_1px,transparent_0)] bg-[size:30px_30px]"></div>
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
              <p class="text-xs font-bold text-accent uppercase tracking-widest">Privacy Policy</p>
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
                 class="block py-2 text-sm font-bold text-muted-foreground hover:text-accent transition-all hover:translate-x-1">
                {{ item.label }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 max-w-3xl">
          <div class="prose prose-invert max-w-none">
            <h2 class="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter italic leading-none">Конфиден-<br/>циальность</h2>
            
            <div class="space-y-20 pb-20">
              <section id="collection" class="scroll-mt-32">
                <div class="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-4">Раздел 01</div>
                <h3 class="text-3xl font-black text-white mb-6">Сбор информации</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Мы собираем данные исключительно для обеспечения работы сервиса. Ваша идентификация происходит через OAuth-провайдеров.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div v-for="item in ['Email адрес', 'Аватар профиля', 'Имя пользователя']" :key="item" class="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-xs font-bold text-white/60">
                    {{ item }}
                  </div>
                </div>
              </section>

              <section id="usage" class="scroll-mt-32">
                <div class="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-4">Раздел 02</div>
                <h3 class="text-3xl font-black text-white mb-6">Использование данных</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Никакого спама. Никакой продажи данных. Мы используем информацию только для:
                </p>
                <div class="space-y-3">
                  <div v-for="point in ['Поддержания работоспособности аккаунта', 'Персонализации рабочих панелей', 'Связи в случае критических обновлений']" 
                       class="flex items-center gap-4 p-4 rounded-2xl bg-accent/5 border border-accent/10 transition-transform hover:scale-[1.02]">
                    <div class="w-2 h-2 rounded-full bg-accent"></div>
                    <span class="text-sm font-bold text-white/90">{{ point }}</span>
                  </div>
                </div>
              </section>

              <section id="security" class="scroll-mt-32">
                <div class="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-4">Раздел 03</div>
                <h3 class="text-3xl font-black text-white mb-6">Безопасность</h3>
                <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                  Ваши данные защищены современными методами шифрования. Мы работаем на базе Supabase, что гарантирует соответствие мировым стандартам безопасности.
                </p>
                <div class="flex flex-wrap gap-4">
                  <div class="px-4 py-2 rounded-full bg-secondary text-[10px] font-black uppercase text-accent border border-accent/20">SSL Encryption</div>
                  <div class="px-4 py-2 rounded-full bg-secondary text-[10px] font-black uppercase text-accent border border-accent/20">OAuth 2.0</div>
                  <div class="px-4 py-2 rounded-full bg-secondary text-[10px] font-black uppercase text-accent border border-accent/20">AES-256</div>
                </div>
              </section>

              <section id="deletion" class="scroll-mt-32">
                <div class="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-4">Раздел 04</div>
                <h3 class="text-3xl font-black text-white mb-6">Право на забвение</h3>
                <p class="text-muted-foreground text-lg leading-relaxed italic border-l-2 border-accent pl-6">
                  Вы можете в любое время запросить полное удаление своего аккаунта. Вся связанная информация будет безвозвратно стерта из наших баз данных в течение 48 часов.
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
  { id: 'collection', label: 'Сбор данных' },
  { id: 'usage', label: 'Использование' },
  { id: 'security', label: 'Безопасность' },
  { id: 'deletion', label: 'Удаление' },
]

useSeoMeta({
  title: 'Privacy Policy | POSTVA',
})
</script>
