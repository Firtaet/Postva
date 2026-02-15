<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent"
       :class="{ 'bg-background/80 backdrop-blur-xl border-white/5 py-3': scrolled, 'py-6': !scrolled }">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(82,136,193,0.3)] group-hover:rotate-12 transition-transform">
          <Icon name="ph:paper-plane-tilt-fill" class="w-6 h-6" />
        </div>
        <span class="text-2xl font-black tracking-tighter text-white">POSTVA</span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-10">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" 
                  class="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4 min-w-[180px] justify-end h-[48px]">
        <transition name="fade-quick" mode="out-in">
          <div v-if="pending" class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-xl bg-white/5 animate-pulse"></div>
             <div class="w-24 h-4 bg-white/5 rounded-full animate-pulse"></div>
          </div>
          
          <div v-else-if="user" class="group relative flex items-center gap-3 pl-2 pr-4 py-1.5 bg-secondary/50 border border-white/5 rounded-2xl hover:border-primary/30 transition-all cursor-default overflow-hidden">
             <div class="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <img :src="user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'" 
                     class="w-full h-full object-cover" 
                     alt="Avatar">
             </div>
             <div class="flex flex-col">
                <span class="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">PRO PLAN</span>
                <span class="text-white text-xs font-bold leading-none truncate max-w-[80px]">
                  {{ user.user_metadata?.full_name || user.email?.split('@')[0] }}
                </span>
             </div>
             <button @click="signOut" class="ml-1 p-1 text-white/20 hover:text-red-400 transition-colors">
                <Icon name="ph:sign-out-bold" class="w-4 h-4" />
             </button>
          </div>

          <div v-else class="flex items-center gap-4">
             <button @click="authModalRef?.open()" class="hidden sm:block text-xs font-black uppercase tracking-widest text-white hover:text-primary transition-colors">Войти</button>
          </div>
        </transition>
      </div>
    </div>

    <AuthModal ref="authModalRef" />
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const { user, logout } = useAuth()
const supabase = useSupabaseClient()
const authModalRef = ref<any>(null)
const pending = ref(true)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const signOut = async () => {
  await logout()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    pending.value = false
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const links = computed(() => {
  const base = [
    { label: 'Возможности', to: '/#features' },
    { label: 'Как это работает', to: '/#how-it-works' },
  ]
  
  if (user.value) {
    return [
      ...base,
      { label: 'Дашборд', to: '/dashboard' },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'Настройки', to: '/profile' },
    ]
  }
  
  return [
    ...base,
    { label: 'Тарифы', to: '/#pricing' },
    { label: 'FAQ', to: '/#faq' },
  ]
})
</script>

<style scoped>
.fade-quick-enter-active,
.fade-quick-leave-active {
  transition: opacity 0.3s ease;
}
.fade-quick-enter-from,
.fade-quick-leave-to {
  opacity: 0;
}
</style>

