<template>
  <section id="testimonials" class="relative py-24 bg-background overflow-hidden">
    <!-- Abstract blobs -->
    <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="container relative z-10 mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Отзывы</h2>
        <h3 class="text-4xl md:text-5xl font-black text-white mb-6">Нам доверяют лидеры рынка</h3>
        <p class="text-lg text-muted-foreground">
          Узнайте, как POSTVA помогает администраторам крупнейших Telegram-сообществ экономить время и увеличивать доходность своих проектов.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, index) in testimonials" :key="index" 
             class="p-8 rounded-[2rem] bg-secondary/20 border border-white/5 backdrop-blur-sm flex flex-col justify-between hover:border-primary/20 transition-all duration-500 group">
          <div>
            <div class="flex gap-1 mb-6">
              <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-4 h-4 text-accent" />
            </div>
            <p class="text-foreground/90 italic mb-8 leading-relaxed">
              "{{ item.text }}"
            </p>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
               {{ item.name[0] }}
            </div>
            <div>
              <div class="text-white font-bold">{{ item.name }}</div>
              <div class="text-xs text-muted-foreground uppercase tracking-widest">{{ item.role }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-50 transition-opacity duration-500">
         <div class="flex items-center gap-2 font-black text-2xl">TELEGRAM NEWS</div>
         <div class="flex items-center gap-2 font-black text-2xl">ADMIN CONF</div>
         <div class="flex items-center gap-2 font-black text-2xl">CRYPTO HUB</div>
         <div class="flex items-center gap-2 font-black text-2xl">TECH BLOG</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: "Александр Петров",
    role: "Владелец сети из 15 каналов",
    text: "Раньше я тратил по 8 часов в день на публикацию рекламы и контента во все каналы. С POSTVA я делаю это за 15 минут утром. Функция AI- уникализации контента — это просто спасение от фильтров Telegram. Окупил подписку за первый же день."
  },
  {
    name: "Марина Иванова",
    role: "Контент-директор агентства",
    text: "Для нашего агентства была критически важна командная работа. Теперь я могу давать доступ редакторам только к определенным каналам и видеть всю статистику в одном окне. Интерфейс настолько понятный, что обучение новых сотрудников занимает минимум времени."
  },
  {
    name: "Дмитрий Волков",
    role: "Админ канала CryptoDaily",
    text: "Автоматический вотермарк и планировщик на неделю вперед — это база, без которой я теперь не представляю работу. Отдельное спасибо за мини-апп в Телеграм, могу управлять каналом даже из спортзала. Сервис на голову выше всех конкурентов."
  }
]
</script>
