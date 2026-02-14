<script setup lang="ts">
// Using @nuxt/icon for beautiful Telegram-related icons
</script>

<template>
  <section class="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-background pt-20">
    <!-- Premium Abstract Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <!-- Gradient Radial Blobs -->
      <div class="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/15 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[100px] animate-blob delay-2000"></div>
      <div class="absolute -bottom-[20%] left-[20%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[130px] animate-blob delay-4000"></div>
      
      <!-- Tech Grid with perspective -->
      <div class="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#5288c1_1px,transparent_1px),linear-gradient(to_bottom,#5288c1_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)]"></div>
      </div>
      
      <!-- Floating Symbols (Abstract) -->
      <div class="absolute top-1/4 left-10 text-primary/20 animate-float">
        <Icon name="ph:paper-plane-tilt-fill" class="w-24 h-24 rotate-[-20deg]" />
      </div>
      <div class="absolute bottom-1/3 right-12 text-accent/20 animate-float delay-1000">
        <Icon name="ph:broadcast-fill" class="w-20 h-20 rotate-[15deg]" />
      </div>
      <div class="absolute top-1/2 left-2/3 text-primary/10 animate-float delay-2000">
        <Icon name="ph:clock-fill" class="w-16 h-16 rotate-[-10deg]" />
      </div>

      <!-- Animated Light Beams -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[600px] bg-gradient-to-b from-transparent via-primary/30 to-transparent blur-sm opacity-50"></div>
    </div>

    <div class="container relative z-10 px-4 mx-auto text-center">
      <!-- Floating Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 mb-10 text-xs font-bold tracking-widest uppercase border rounded-full bg-secondary/40 border-white/5 text-accent backdrop-blur-xl animate-fade-in-up">
        <span class="relative flex w-2 h-2">
          <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent"></span>
          <span class="relative inline-flex w-2 h-2 rounded-full bg-accent"></span>
        </span>
        <span>AI-Powered Telegram Automation</span>
      </div>

      <!-- Main Heading with Gradient -->
      <h1 class="max-w-5xl mx-auto mb-8 text-6xl font-black tracking-tighter text-white md:text-8xl lg:text-9xl animate-fade-in-up delay-150">
        Ваш Telegram <br class="hidden md:block" /> 
        <span class="text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-primary bg-text-gradient animate-gradient">на автопилоте</span>
      </h1>

      <!-- Elegant Subtext -->
      <p class="max-w-3xl mx-auto mb-12 text-lg font-medium leading-relaxed md:text-2xl text-muted-foreground/80 animate-fade-in-up delay-300">
        Забудьте про рутину. Публикуйте контент, анализируйте охваты и масштабируйте сетку каналов с помощью технологий нового поколения.
      </p>

      <!-- Advanced CTAs -->
      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row animate-fade-in-up delay-450">
        <NuxtLink 
          to="/register" 
          class="group relative overflow-hidden inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-500 bg-primary rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(82,136,193,0.5)] active:scale-95"
        >
          <div class="absolute inset-0 transition-transform duration-500 scale-x-0 bg-accent group-hover:scale-x-100 origin-left"></div>
          <span class="relative z-10">Попробовать сейчас</span>
          <Icon name="ph:arrow-right-bold" class="relative z-10 w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </NuxtLink>
        
        <NuxtLink 
          to="#features" 
          class="group inline-flex items-center justify-center px-10 py-5 font-bold transition-all duration-300 border-2 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl active:scale-95 text-foreground"
        >
          <span>Узнать больше</span>
          <Icon name="ph:lightning-fill" class="w-5 h-5 ml-2 text-accent group-hover:animate-pulse" />
        </NuxtLink>
      </div>

      <!-- Minimalist Stats -->
      <div class="flex flex-wrap items-center justify-center gap-12 mt-24 md:gap-20 animate-fade-in-up delay-[600ms]">
        <div class="flex flex-col gap-1 text-left">
          <span class="text-3xl font-black text-white md:text-4xl counters">12,400+</span>
          <span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">Активных клиентов</span>
        </div>
        <div class="w-px h-12 bg-white/10 hidden md:block"></div>
        <div class="flex flex-col gap-1 text-left">
          <span class="text-3xl font-black text-white md:text-4xl counters">2.5M+</span>
          <span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">Постов создано</span>
        </div>
        <div class="w-px h-12 bg-white/10 hidden md:block"></div>
        <div class="flex flex-col gap-1 text-left">
          <span class="text-3xl font-black text-white md:text-4xl counters">4.9/5</span>
          <span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">Рейтинг сервиса</span>
        </div>
      </div>
    </div>

    <!-- Decorative mask for bottom fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
  </section>
</template>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0%, 100% { transform: scale(1) translate(0, 0); }
  33% { transform: scale(1.1) translate(30px, -50px); }
  66% { transform: scale(0.9) translate(-20px, 40px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-20deg); }
  50% { transform: translateY(-30px) rotate(-15deg); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-gradient { background-size: 200% auto; animation: gradient 4s linear infinite; }

.delay-150 { animation-delay: 0.15s; }
.delay-300 { animation-delay: 0.3s; }
.delay-450 { animation-delay: 0.45s; }

.bg-text-gradient { background-size: 300% auto; }

/* Custom mask for subtle noise/texture if needed */
section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
</style>

