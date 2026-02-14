<script setup lang="ts">
const isSteaming = ref(false)

const brewTea = () => {
  isSteaming.value = true
  setTimeout(() => {
    isSteaming.value = false
  }, 3000)
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-background font-sans selection:bg-primary/30">
    <!-- Premium Abstract Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute -top-[10%] left-[20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-accent/15 rounded-full blur-[100px] animate-blob delay-2000"></div>
      
      <!-- Tech Grid -->
      <div class="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#5288c1_1px,transparent_1px),linear-gradient(to_bottom,#5288c1_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <!-- Floating Tea Particles -->
      <div v-for="i in 10" :key="i" 
           class="absolute w-2 h-2 rounded-full bg-accent/20 animate-float-particle"
           :style="{ 
             left: Math.random() * 100 + '%', 
             top: Math.random() * 100 + '%',
             animationDelay: Math.random() * 5 + 's',
             animationDuration: (5 + Math.random() * 5) + 's'
           }">
      </div>
    </div>

    <div class="container relative z-10 px-4 mx-auto text-center">
      <!-- Teapot Icon -->
      <div class="relative mb-12 inline-block animate-fade-in-up">
        <Icon 
          name="ph:coffee-fill" 
          class="w-32 h-32 md:w-48 md:h-48 text-primary transition-transform duration-500"
          :class="{'scale-110 rotate-12': isSteaming}" 
        />
        <!-- Status Code Badge -->
        <div class="absolute -top-4 -right-8 px-4 py-2 bg-accent text-white font-black rounded-lg shadow-lg rotate-12">
          418
        </div>
        
        <!-- Steam Animation -->
        <div v-if="isSteaming" class="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
          <div v-for="i in 3" :key="i" class="w-2 h-8 bg-white/40 blur-sm rounded-full animate-steam" :style="{animationDelay: (i * 0.2) + 's'}"></div>
        </div>
      </div>

      <!-- Content -->
      <h1 class="text-4xl md:text-6xl font-black text-white mb-6 animate-fade-in-up delay-150">
        Я — Чайник!
      </h1>
      <p class="max-w-xl mx-auto mb-12 text-lg md:text-xl text-muted-foreground/80 animate-fade-in-up delay-300">
        Код ошибки 418. Я не могу сварить вам кофе (потому что я чайник 🫖), но я чертовски хорошо автоматизирую ваши Telegram каналы.
      </p>

      <!-- Fun Button -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-450">
        <button 
          @click="brewTea"
          class="group relative overflow-hidden inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-500 bg-secondary rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(82,136,193,0.3)] active:scale-95 border border-white/10"
        >
          <div class="absolute inset-0 transition-transform duration-500 scale-x-0 bg-primary/20 group-hover:scale-x-100 origin-left"></div>
          <Icon name="ph:fire-fill" class="relative z-10 w-5 h-5 mr-2 text-accent" />
          <span class="relative z-10">{{ isSteaming ? 'Завариваю...' : 'Вскипятить чай' }}</span>
        </button>

        <NuxtLink 
          to="/" 
          class="inline-flex items-center justify-center px-10 py-5 font-bold transition-all duration-300 border rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl active:scale-95 text-foreground"
        >
          Домой
        </NuxtLink>
      </div>
    </div>
  </div>
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

@keyframes float-particle {
  0%, 100% { transform: translate(0, 0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(20px, -100px); opacity: 0; }
}

@keyframes steam {
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
}

.animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animate-steam { animation: steam 1.5s ease-out infinite; }

.delay-150 { animation-delay: 0.15s; }
.delay-300 { animation-delay: 0.3s; }
.delay-450 { animation-delay: 0.45s; }

/* Noise Texture */
div.relative::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
</style>
