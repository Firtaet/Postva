<template>
  <div class="relative min-h-screen flex bg-background overflow-hidden selection:bg-primary/30">
    <!-- Main Auth Column (iloimg inspired layout) -->
    <div class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative order-2 lg:order-1">
      <!-- Mobile Logo -->
      <NuxtLink to="/" class="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <Icon name="ph:paper-plane-tilt-fill" class="w-5 h-5" />
        </div>
        <span class="font-black text-white">POSTVA</span>
      </NuxtLink>

      <div class="w-full max-w-md">
        <div class="text-center md:text-left mb-10">
          <h1 class="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">Регистрация</h1>
          <p class="text-muted-foreground">Уже есть аккаунт? <NuxtLink to="/login" class="text-primary font-bold hover:underline">Войти</NuxtLink></p>
        </div>

        <!-- Social Login Grid -->
        <div class="grid grid-cols-1 gap-4 mb-8">
          <button class="flex items-center justify-center gap-4 py-4 px-6 bg-white text-black hover:bg-neutral-100 transition-all rounded-2xl font-bold active:scale-98">
            <Icon name="logos:google-icon" class="w-6 h-6" />
            Зарегистрироваться через Google
          </button>
          
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-3 py-4 px-6 bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all rounded-2xl font-bold active:scale-98">
              <Icon name="logos:discord-icon" class="w-5 h-5" />
              через Discord
            </button>
            <button class="flex items-center justify-center gap-3 py-4 px-6 bg-[#24292F] text-white hover:bg-[#1A1E23] transition-all rounded-2xl font-bold border border-white/5 active:scale-98">
              <Icon name="logos:github-icon" class="w-5 h-5 invert" />
              через GitHub
            </button>
          </div>
        </div>

        <div class="relative flex items-center gap-4 mb-8">
          <div class="flex-1 h-px bg-white/5"></div>
          <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Простая настройка</span>
          <div class="flex-1 h-px bg-white/5"></div>
        </div>

        <!-- Benefits List -->
        <div class="grid grid-cols-1 gap-4">
          <div v-for="(text, i) in benefits" :key="i" class="flex gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
            <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Icon :name="i === 0 ? 'ph:rocket-fill' : i === 1 ? 'ph:sparkle-fill' : 'ph:users-four-fill'" class="w-5 h-5" />
            </div>
            <div>
               <div class="text-white font-bold text-sm mb-1">{{ text.title }}</div>
               <div class="text-muted-foreground text-xs leading-relaxed">{{ text.desc }}</div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center text-xs text-muted-foreground">
          Нажимая «Зарегистрироваться», вы соглашаетесь с <br class="hidden sm:block"/> 
          <NuxtLink to="/terms" class="underline">Условиями</NuxtLink> и <NuxtLink to="/privacy" class="underline">Политикой</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const benefits = [
  { title: "Запуск за 30 секунд", desc: "Подключите свой первый канал и начните публикацию контента мгновенно." },
  { title: "AI Помощник", desc: "Дайте нейросети задачу, и она создаст идеальный пост для вашей аудитории." },
  { title: "Командный доступ", desc: "Добавьте коллег и распределите обязанности между администраторами." }
]
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.05) translate(-10px, 20px); }
}
.animate-blob { animation: blob 12s ease-in-out infinite; }
</style>
