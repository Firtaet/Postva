<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-background font-sans selection:bg-primary/30">
    <!-- Premium Abstract Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[100px] animate-blob delay-2000"></div>
      
      <!-- Tech Grid -->
      <div class="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#5288c1_1px,transparent_1px),linear-gradient(to_bottom,#5288c1_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </div>

    <div class="container relative z-10 px-4 mx-auto text-center">
      <!-- Error Code -->
      <div class="mb-4 inline-block">
        <span class="text-[10rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-background opacity-40">
          {{ error?.statusCode || '404' }}
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-black text-white mb-6 animate-fade-in-up">
        Упс! Произошла ошибка
      </h1>
      <p class="max-w-md mx-auto mb-12 text-muted-foreground/80 animate-fade-in-up delay-150">
        {{ error?.message || 'Что-то пошло не так. Но не волнуйтесь, наши боты уже восстанавливают систему.' }}
      </p>

      <button 
        @click="handleError"
        class="group relative overflow-hidden inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-500 bg-primary rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(82,136,193,0.5)] active:scale-95"
      >
        <div class="absolute inset-0 transition-transform duration-500 scale-x-0 bg-accent group-hover:scale-x-100 origin-left"></div>
        <Icon name="ph:house-fill" class="relative z-10 w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
        <span class="relative z-10">Вернуться домой</span>
      </button>
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

.animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.delay-150 { animation-delay: 0.15s; }
</style>
