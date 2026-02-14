<template>
  <div class="relative min-h-screen flex bg-background overflow-hidden selection:bg-primary/30">

    <!-- Main Auth Column (iloimg inspired layout) -->
    <div class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative">
      <!-- Mobile Logo -->
      <NuxtLink to="/" class="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <Icon name="ph:paper-plane-tilt-fill" class="w-5 h-5" />
        </div>
        <span class="font-black text-white">POSTVA</span>
      </NuxtLink>

      <div class="w-full max-w-md">
        <div class="text-center md:text-left mb-10">
          <h1 class="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">Вход в аккаунт</h1>
          <p class="text-muted-foreground">Ещё нет аккаунта? <NuxtLink to="/register-demo" class="text-primary font-bold hover:underline">Создать сейчас</NuxtLink></p>
        </div>

        <!-- Social Login Grid -->
        <div class="grid grid-cols-1 gap-4 mb-8">
          <button class="flex items-center justify-center gap-4 py-4 px-6 bg-white text-black hover:bg-neutral-100 transition-all rounded-2xl font-bold active:scale-98">
            <Icon name="logos:google-icon" class="w-6 h-6" />
            Войти через Google
          </button>
          
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-3 py-4 px-6 bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all rounded-2xl font-bold active:scale-98">
              <Icon name="logos:discord-icon" class="w-5 h-5" />
              Discord
            </button>
            <button class="flex items-center justify-center gap-3 py-4 px-6 bg-[#24292F] text-white hover:bg-[#1A1E23] transition-all rounded-2xl font-bold border border-white/5 active:scale-98">
              <Icon name="logos:github-icon" class="w-5 h-5 invert" />
              GitHub
            </button>
          </div>
        </div>

        <div class="relative flex items-center gap-4 mb-8">
          <div class="flex-1 h-px bg-white/5"></div>
          <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Бесплатный вход</span>
          <div class="flex-1 h-px bg-white/5"></div>
        </div>

        <!-- Feature List for Login (Inspired by side-blocks) -->
        <div class="space-y-4">
          <div v-for="i in ['Мгновенная синхронизация', 'Защита данных', 'Доступ из любой точки']" :key="i" class="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-white/5">
            <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Icon name="ph:check-bold" class="w-4 h-4" />
            </div>
            <span class="text-sm font-medium text-foreground/80">{{ i }}</span>
          </div>
        </div>

        <div class="mt-12 text-center text-xs text-muted-foreground">
          Нажимая «Войти», вы соглашаетесь с нашими <br class="hidden sm:block"/> 
          <NuxtLink to="/terms" class="underline">Условиями использования</NuxtLink> и <NuxtLink to="/privacy" class="underline">Политикой конфиденциальности</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.1) translate(20px, -20px); }
}
.animate-blob { animation: blob 10s ease-in-out infinite; }
</style>
