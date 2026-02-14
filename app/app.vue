<template>
  <div class="app-container min-h-screen bg-background text-foreground font-sans">
    <!-- Main Content (No global loader, components handle themselves) -->
    <div class="relative">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <!-- Global Toaster -->
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner' 
import 'vue-sonner/style.css'
// Global SEO and meta
useSeoMeta({
  titleTemplate: (title) => title ? `${title} | POSTVA` : 'POSTVA — Умная автоматизация Telegram',
})
</script>

<style>
/* Global smooth styles */
::selection {
  background: var(--color-primary);
  color: white;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.page-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(-10px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #17212b;
}
::-webkit-scrollbar-thumb {
  background: #232e3c;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2b3a4a;
}
</style>
