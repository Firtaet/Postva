<template>
  <section id="how-it-works" class="relative py-24 bg-background">
    <div class="container relative z-10 mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <div class="lg:w-1/2">
          <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Процесс</h2>
          <h3 class="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Запустите автоматизацию <br/> за 3 простых шага
          </h3>
          
          <div class="space-y-10">
            <!-- Step 1 -->
            <div class="flex gap-6 group">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold transition-colors group-hover:bg-primary group-hover:text-white">
                1
              </div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Подключите каналы</h4>
                <p class="text-muted-foreground leading-relaxed">
                  Просто добавьте нашего официального бота в администраторы вашего канала. Это безопасно и занимает не более 30 секунд. Вы можете подключить неограниченное количество каналов даже на бесплатном тарифе.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex gap-6 group">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold transition-colors group-hover:bg-accent group-hover:text-white">
                2
              </div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Настройте контент-план</h4>
                <p class="text-muted-foreground leading-relaxed">
                  Загрузите ваши материалы или используйте наш AI для поиска и создания новых постов. Наш алгоритм подскажет лучшие часы для публикации, чтобы ваш контент увидело как можно больше людей. Гибкий календарь позволит спланировать работу на недели вперед.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex gap-6 group">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold transition-colors group-hover:bg-primary group-hover:text-white">
                3
              </div>
              <div>
                <h4 class="text-xl font-bold text-white mb-2">Наблюдайте за ростом</h4>
                <p class="text-muted-foreground leading-relaxed">
                  Система возьмет на себя публикацию в точно заданное время. Вам остается только следить за разделом аналитики, отвечать на комментарии и наслаждаться тем, как растет ваша аудитория. Мы поможем вам автоматизировать даже взаимодействие с рекламодателями.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Abstract Visual Representation -->
        <div class="lg:w-1/2 relative">
          <div class="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 bg-secondary/50 p-8 backdrop-blur-xl aspect-square flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50"></div>
            
            <!-- Animated Nodes Visualization -->
            <div class="relative w-full h-full flex items-center justify-center">
               <div class="absolute w-64 h-64 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow"></div>
               <div class="absolute w-40 h-40 border-2 border-dashed border-accent/20 rounded-full animate-spin-reverse-slow"></div>
               
               <div class="relative z-20 bg-background/80 p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md animate-bounce-slow">
                 <Icon name="ph:paper-plane-tilt-fill" class="w-20 h-20 text-accent" />
               </div>

               <!-- Floating Orbs -->
               <div class="absolute top-10 left-10 w-4 h-4 rounded-full bg-primary animate-pulse"></div>
               <div class="absolute bottom-10 right-10 w-6 h-6 rounded-full bg-accent animate-pulse delay-700"></div>
            </div>
          </div>

          <!-- Decorative Glow -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[150px] -z-10 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin-reverse-slow {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.animate-spin-slow { animation: spin-slow 20s linear infinite; }
.animate-spin-reverse-slow { animation: spin-reverse-slow 15s linear infinite; }
.animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
</style>
