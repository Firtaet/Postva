<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-background select-none pointer-events-none transition-opacity duration-500"
       :class="{ 'opacity-0': !visible }">
    <div class="relative flex flex-col items-center gap-8">
      <!-- Telegram-style Animated Logo/Icon -->
      <div class="relative w-24 h-24">
        <!-- Outer glowing ring -->
        <div class="absolute inset-0 rounded-[2rem] border-4 border-primary/20 animate-pulse"></div>
        <!-- Inner spinning border -->
        <div class="absolute inset-0 rounded-[2rem] border-t-4 border-primary animate-spin opacity-40"></div>
        <!-- Center Icon -->
        <div class="absolute inset-0 flex items-center justify-center text-primary animate-bounce-subtle">
          <Icon name="ph:paper-plane-tilt-fill" class="w-12 h-12" />
        </div>
      </div>
      
      <!-- Progress/Loading Text -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-white font-black tracking-[0.2em] uppercase text-xs animate-pulse">POSTVA</span>
        <div class="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
          <div class="h-full bg-primary animate-loading-bar shadow-[0_0_10px_rgba(82,136,193,0.8)]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<style scoped>
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes loading-bar {
  0% { width: 0%; transform: translateX(-100%); }
  50% { width: 100%; transform: translateX(0); }
  100% { width: 0%; transform: translateX(100%); }
}

.animate-loading-bar {
  animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>
