<template>
  <section id="pricing" class="relative py-24 bg-background">
    <div class="container relative z-10 mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Тарифы</h2>
        <h3 class="text-4xl md:text-5xl font-black text-white mb-6">Прозрачные цены для любого масштаба</h3>
        <p class="text-lg text-muted-foreground">
          Начните бесплатно и масштабируйтесь по мере роста вашего бизнеса. Выберите план, который подходит именно вам.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-10 rounded-[2.5rem] bg-secondary/30 border border-white/5 flex flex-col transition-all duration-300 hover:border-white/10">
          <h4 class="text-xl font-bold text-white mb-2">Начальный</h4>
          <div class="text-4xl font-black text-white mb-6">0$ <span class="text-lg font-normal text-muted-foreground">/ мес</span></div>
          <p class="text-muted-foreground mb-8 text-sm leading-relaxed">
            Отличное решение для тех, кто только начинает свой путь в Telegram и хочет протестировать базовые возможности автоматизации.
          </p>
          <ul class="space-y-4 mb-10 flex-grow">
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              1 Telegram канал
            </li>
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              До 5 постов в день
            </li>
            <li class="flex items-center gap-3 text-sm text-foreground/20 italic">
              AI-генератор (недоступно)
            </li>
          </ul>
          <NuxtLink to="/register" class="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-center font-bold hover:bg-white/10 transition-colors">Выбрать</NuxtLink>
        </div>
        <div class="p-10 rounded-[2.5rem] bg-secondary/30 border border-white/5 flex flex-col transition-all duration-300 hover:border-white/10">
          <h4 class="text-xl font-bold text-white mb-2">Бизнес</h4>
          <div class="text-4xl font-black text-white mb-6">15$ <span class="text-lg font-normal text-muted-foreground">/ мес</span></div>
          <p class="text-muted-foreground mb-8 text-sm leading-relaxed">
            Решение для медиа-сетк и агентств. Максимальная мощность, командный доступ и глубокая кастомизация под ваши задачи.
          </p>
          <ul class="space-y-4 mb-10 flex-grow">
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              Безлимит каналов
            </li>
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              Командный доступ (10 чел)
            </li>
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              Все ИИ функции
            </li>
            <li class="flex items-center gap-3 text-sm text-foreground/80">
              <Icon name="ph:check-bold" class="text-primary w-5 h-5" />
              API доступ для интеграций
            </li>
          </ul>
          <NuxtLink to="/register" class="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-center font-bold hover:bg-white/10 transition-colors">Связаться с нами</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
