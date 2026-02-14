<template>
  <section id="faq" class="relative py-24 bg-background">
    <div class="container relative z-10 mx-auto px-4 max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Часто задаваемые вопросы</h2>
        <h3 class="text-4xl md:text-5xl font-black text-white mb-6">Остались вопросы?</h3>
        <p class="text-lg text-muted-foreground">
          Мы собрали самые популярные вопросы админов, чтобы вы могли быстро разобраться, как работает наш сервис и насколько он безопасен.
        </p>
      </div>

      <div class="space-y-4">
        <div v-for="(item, index) in faqs" :key="index" 
             class="group rounded-3xl bg-secondary/30 border border-white/5 overflow-hidden transition-all duration-300 hover:border-primary/20">
          <button @click="toggle(index)" class="w-full p-8 text-left flex items-center justify-between">
            <span class="text-xl font-bold text-white group-hover:text-primary transition-colors">{{ item.question }}</span>
            <Icon 
              name="ph:caret-down-bold" 
              class="w-6 h-6 text-muted-foreground transition-transform duration-300"
              :class="{ 'rotate-180 text-primary': activeIndex === index }"
            />
          </button>
          
          <div v-show="activeIndex === index" class="px-8 pb-8 animate-fade-in">
            <p class="text-muted-foreground leading-relaxed text-lg">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 text-center backdrop-blur-md">
        <h4 class="text-2xl font-bold text-white mb-4">Не нашли ответа?</h4>
        <p class="text-muted-foreground mb-8">
          Наша команда поддержки работает 24/7. Напишите нам напрямую в Telegram, и мы ответим в течение 15 минут.
        </p>
        <NuxtLink to="https://t.me/support" class="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
          Чат поддержки в Telegram
          <Icon name="ph:arrow-square-out-bold" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeIndex = ref<number | null>(0)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = [
  {
    question: "Безопасно ли подключать канал к вашему сервису?",
    answer: "Абсолютно. Мы используем официальные протоколы Telegram API. Наш бот запрашивает только необходимые права на чтение и публикацию сообщений. Мы не имеем доступа к вашим личным данным или данным ваших подписчиков. Безопасность — наш главный приоритет, поэтому вся информация шифруется по стандартам AES-256."
  },
  {
    question: "Могу ли я планировать публикации через мобильное приложение?",
    answer: "Да, наш интерфейс полностью адаптивен и отлично работает на смартфонах и планшетах. Более того, у нас есть мини-приложение (Telegram Web App), которое позволяет управлять всеми процессами напрямую через мессенджер, не переключаясь в браузер."
  },
  {
    question: "Есть ли ограничения на количество постов в день?",
    answer: "На платном тарифе никаких ограничений нет. Вы можете планировать тысячи постов на годы вперед. На бесплатном тарифе есть лимит до 5 постов в сутки на один канал, что вполне достаточно для личных блогов и небольших сообществ."
  },
  {
    question: "Как работает AI-автоматизация контента?",
    answer: "Наш искусственный интеллект анализирует тематику вашего канала и предлагает актуальные инфоповоды. Он может адаптировать длинные статьи в короткие посты для Telegram, подбирать подходящие изображения через генеративные нейросети и даже отвечать на типовые комментарии пользователей, имитируя ваш стиль общения."
  },
  {
    question: "Можно ли настроить автоматический вотермарк?",
    answer: "Конечно! Вы можете загрузить свой логотип в настройках профиля, и система будет автоматически накладывать его на все загружаемые изображения и видео в выбранном вами углу. Это защитит ваш уникальный контент от копирования конкурентами."
  }
]
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
</style>
