<template>
  <section id="features" class="relative py-24 bg-background overflow-hidden">
    <!-- Abstract background elements -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

    <div class="container relative z-10 mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Возможности</h2>
        <h3 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Все, что нужно для взрывного роста вашего канала
        </h3>
        <p class="text-lg text-muted-foreground">
          Мы объединили передовые AI-технологии и многолетний опыт управления сетками каналов, чтобы вы могли сосредоточиться на стратегии, пока мы занимаемся рутиной.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:robot-fill" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">Умный автопостинг</h4>
          <p class="text-muted-foreground leading-relaxed">
            Система автоматически оптимизирует время публикации на основе активности вашей аудитории. Используйте AI для генерации цепляющих заголовков и адаптации контента под формат Telegram. 
            Добавьте 600 слов? Мы поможем вам структурировать контент так, чтобы его читали до конца.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:chart-line-up-bold" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">Глубокая аналитика</h4>
          <p class="text-muted-foreground leading-relaxed">
            Отслеживайте не только просмотры, но и вовлеченность, конверсию в подписку и виральность каждого поста. Наши графики в реальном времени показывают, какой контент приносит вам деньги, а какой — просто занимает место. Полный контроль над метриками вашего успеха.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:intersect-square-fill" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">Управление сетками</h4>
          <p class="text-muted-foreground leading-relaxed">
            Управляйте десятками каналов из одного окна. Кросс-постинг, уникализация контента для разных аудиторий и централизованный контроль комментариев. Идеальное решение для крупных медиа-холдингов и профессиональных админов.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:shield-check-fill" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">Безопасность и стабильность</h4>
          <p class="text-muted-foreground leading-relaxed">
            Ваши токены и данные защищены банковским шифрованием. Мы работаем через официальный API и гарантируем 99.9% аптайм. Никаких блокировок и утечек — ваша работа в надежных руках.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:magic-wand-fill" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">AI-Редактор</h4>
          <p class="text-muted-foreground leading-relaxed">
            Встроенный редактор изображений и видео. Удаление фона, наложение вотермарок и создание превью в один клик. Искусственный интеллект подберет идеальные эмодзи и хештеги для вашего текста.
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
          <div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon name="ph:users-three-fill" class="w-8 h-8" />
          </div>
          <h4 class="text-xl font-bold text-white mb-4">Командная работа</h4>
          <p class="text-muted-foreground leading-relaxed">
            Распределяйте роли между редакторами, модераторами и аналитиками. Настраивайте цепочки одобрения постов. Больше никакой путаницы с паролями — у каждого свой доступ.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
