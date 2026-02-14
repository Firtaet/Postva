<template>
  <div class="flex flex-col gap-0 min-h-screen bg-background">
      <TheHero />
      <Features />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      
      <!-- Final CTA Section (Inline for emphasis) -->
      <section class="py-32 relative overflow-hidden">
        <div class="absolute inset-0 bg-primary/5 -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div class="container mx-auto px-4 text-center">
             <div class="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-widest uppercase border rounded-full bg-primary/10 border-primary/20 text-primary">
                Ограниченное предложение
             </div>
             <h2 class="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
               Присоединяйтесь к <span class="text-primary italic">будущему</span> <br class="hidden md:block"/> Telegram автоматизации
             </h2>
             <p class="max-w-2xl mx-auto mb-12 text-muted-foreground text-lg md:text-xl">
               Начните использовать возможности искусственного интеллекта для масштабирования вашей контент-сетки уже сегодня. 7 дней Про-тарифа бесплатно.
             </p>
             <NuxtLink 
              to="/register" 
              class="group relative overflow-hidden inline-flex items-center justify-center px-12 py-6 font-black text-xl text-white transition-all duration-500 bg-primary rounded-[2rem] hover:shadow-[0_20px_60px_-10px_rgba(82,136,193,0.6)] active:scale-95"
            >
              <div class="absolute inset-0 transition-transform duration-500 scale-x-0 bg-accent group-hover:scale-x-100 origin-left"></div>
              <span class="relative z-10">Попробовать бесплатно</span>
              <Icon name="ph:rocket-launch-fill" class="relative z-10 w-6 h-6 ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </NuxtLink>
            <div class="mt-8 flex items-center justify-center gap-6">
                <div class="flex -space-x-3">
                    <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {{ i*2 }}
                    </div>
                </div>
                <p class="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">12,400+ админов уже с нами</p>
            </div>
        </div>
      </section>
  </div>
</template>

<script setup lang="ts">
// Page meta is already set in app.vue or here.
useSeoMeta({
  title: 'POSTVA — Умная автоматизация Telegram каналов',
  description: 'Автоматизируйте публикации, анализируйте охваты и масштабируйте сетку каналов с помощью AI технологий. Профессиональный инструмент для администраторов Telegram и медиа-агентств.',
  ogTitle: 'POSTVA — Будущее вашего Telegram канала уже здесь',
  ogDescription: 'Запустите автоматизацию за 30 секунд. Безопасно, быстро и эффективно.',
  ogImage: 'https://postva.xyz/og-image-v2.png',
  twitterCard: 'summary_large_image',
})
</script>
